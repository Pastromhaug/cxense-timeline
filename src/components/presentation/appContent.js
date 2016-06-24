/**
 * Created by perandre on 6/23/16.
 */

import React from 'react';
import AppBar from 'material-ui/AppBar';
import {appbarStyles, headerButton, headerTitle} from '../../styles/componentStyles';
import FlatButton from 'material-ui/FlatButton';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import {Link} from 'react-router';
var moment = require('moment');
var _ = require('lodash');
import {PROJECTS} from '../../constants/projectConstants';
var $ = require('jquery');

class AppContent extends React.Component {

    constructor() {
        super();
        this._initIssues.bind(this);
        this._formatIssues.bind(this);
        this._handleDrawerClick.bind(this);
    }

    render() {
        return (
            <div>
                <Drawer open={true} zDepth={1} docked={true} >
                    <div style={{height: '64px', width: '100%', color: 'rgb(243,243,243)',
                        backgroundColor: 'rgb(70,77,91)', textAlign: 'center',
                        display: 'flex', justifyContent: 'center'
                        }}>
                        <h3>Projects </h3>
                    </div>
                    {PROJECTS.map( loc => {
                        return (
                            <div>
                                <MenuItem disabled={true} style={{paddingTop: '24px'}} id={loc.name}> {loc.name} </MenuItem>
                                {loc.projects.map( proj => {
                                    return (
                                        <MenuItem style={{paddingLeft: '24px'}} id={proj.name}> {proj.name} </MenuItem>
                                    )
                                })}
                                <Divider/>
                            </div>
                        )
                    })}
                </Drawer>
                <div style={{marginLeft: 256}}>
                    <div  style={appbarStyles.container}>

                        <Link className="MyLink" to="/timeline" >
                            <FlatButton style={headerButton.container}>Timeline</FlatButton>
                        </Link>

                        <Link className="MyLink" to="/query">
                            <FlatButton style={headerButton.container}>Edit Query</FlatButton>
                        </Link>

                        <Link className="MyLink" to="/columns" >
                            <FlatButton style={headerButton.container}>Configure Columns</FlatButton>
                        </Link>

                    </div>
                <div style={{padding: '16px'}}>
                    {this.props.children}
                </div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        console.log('initing card')
        this._initIssues();
    }

    componentDidUpdate() {
        console.log('card updating')
        this._initIssues();
    }

    _handleDrawerClick() {}

    _initIssues() {
        var stem = 'https://jira.cxense.com/rest/api/2/search?jql='
        //var url = 'http://localhost:8001/sample';
        //fetch(stem + this.props.query).then((data) => data.json())
        //    .then( (data) => {
        //        var items = this._formatIssues(data);
        //        this.props.dispatchAddIssues(items);
        //    });

        $.getJSON(stem + this.props.query, (data) => {
            console.log(data);
        });

        var createCORSRequest = function(method, url) {
            var xhr = new XMLHttpRequest();
            if ("withCredentials" in xhr) {
                // Most browsers.
                xhr.open(method, url, true);
            } else if (typeof XDomainRequest != "undefined") {
                // IE8 & IE9
                xhr = new XDomainRequest();
                xhr.open(method, url);
            } else {
                // CORS not supported.
                xhr = null;
            }
            return xhr;
        };

        var url = stem + this.props.query;
        var method = 'GET';
        var xhr = createCORSRequest(method, url);

        xhr.onload = function() {

            // Success code goes here.
        };

        xhr.onerror = function() {
            // Error code goes here.
        };

        xhr.send();
    }

    _formatIssues(data) {
        data = data.issues.filter( (d) => {
            return _.has(d.fields, 'customfield_10651') && _.has(d.fields, 'customfield_10652');});
        data = data.filter( (d) => {
            return (
                d.fields.customfield_10651 != null && typeof d.fields.customfield_10651 !== 'undefined'
                && d.fields.customfield_10652 != null && typeof d.fields.customfield_10652 !== 'undefined'
            )});


        var items = data.map( (d) => {
            let start = moment.utc(d.fields.customfield_10651).valueOf();
            let end = moment.utc(d.fields.customfield_10652).valueOf();
            let time_left = 0;
            if (end > moment.utc().valueOf()) time_left = end - moment.utc().valueOf();


            return {
                lane: 0,
                name: d.fields.summary + " (" + d.fields.issuetype.name + ")",
                start: start,
                end: end,
                id: d.key,
                status: d.fields.status.name,
                remaining_estimate: time_left,
                planning_status: d.fields.status.description

            };});

        items = items.sort( (a,b) => d3.ascending(a.start, b.start));
        items = items.sort( (a,b) => d3.ascending(a.end, b.end));

        var laneData = [];
        items = items.map( (new_item) => {
            var laneDataLength = laneData.length;
            for (let i = 0; i <= laneDataLength; i++){
                if (i == laneData.length) {
                    new_item.lane = i;
                    laneData = laneData.concat([[new_item]]);
                    return new_item;}
                else {
                    let overlaps = laneData[i].filter( (item) => (
                    item.start >= new_item.start && item.start <= new_item.end
                    || item.end >= new_item.start && item.end <= new_item.end
                    || item.start <= new_item.start && item.end >= new_item.end));
                    if (overlaps.length == 0) {
                        new_item.lane = i;
                        laneData[i] = laneData[i].concat([new_item]);
                        return new_item;}
                }
            }});
        return items;
    }
}

export default AppContent;