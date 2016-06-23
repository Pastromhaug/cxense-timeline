/**
 * Created by perandre on 6/23/16.
 */

import React from 'react';
import AppBar from 'material-ui/AppBar';
import {appbarStyles, headerButton, headerTitle} from '../../styles/componentStyles';
import FlatButton from 'material-ui/FlatButton';
import {Link} from 'react-router';
var moment = require('moment');
var _ = require('lodash');

class AppContent extends React.Component {

    constructor() {
        super();
        this._initIssues.bind(this);
        this._formatIssues.bind(this);
    }

    render() {
        return (
            <div>
                <AppBar
                    showMenuIconButton={false}
                    style={appbarStyles.container}>

                    <Link className="MyLink" to="/timeline" >
                        <FlatButton style={headerButton.container}>Timeline</FlatButton>
                    </Link>

                    <Link className="MyLink" to="/query">
                        <FlatButton style={headerButton.container}>Edit Query</FlatButton>
                    </Link>

                    <Link className="MyLink" to="/columns" >
                        <FlatButton style={headerButton.container}>Configure Columns</FlatButton>
                    </Link>

                </AppBar>
                <div style={{padding: '16px'}}>
                    {this.props.children}
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

    _initIssues() {
        fetch(this.props.query).then((data) => data.json())
            .then( (data) => {
                var items = this._formatIssues(data);
                this.props.dispatchAddIssues(items);
            })
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