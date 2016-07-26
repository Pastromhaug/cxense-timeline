/**
 * Created by perandre on 6/23/16.
 */

import React from 'react';
import {appbarStyles, headerButton} from '../../styles/componentStyles';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import VisibleQueryDialog from '../logic/visibleQueryDialog'
import {Link} from 'react-router';
import FIREBASE from '../../constants/firebase';
var moment = require('moment');
var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();
var d3 = require('d3');
var _ = require('lodash');


class AppContent extends React.Component {

    constructor() {
        super();
        this._initIssues.bind(this);
        this._formatIssues.bind(this);
        this.queriesRef = FIREBASE.database().ref('queries/');
        this.queriesListener = null;
    }

    componentDidMount() {
        this.queriesListener = this.queriesRef.on('value', (data) => {
            console.log(data.val());
            const ordered_saved_queries = _.values(data.val()).sort( (a,b) => {
                return a.created_at < b.created_at
            });
            console.log(ordered_saved_queries);
            this.props.dispatchSetSavedQueries(ordered_saved_queries)
        });
    }

    componentWillUnmount() {
        this.queriesListener.off()
    }

    render() {

        return (
            <div>
                <VisibleQueryDialog/>
                <Drawer open={true} zDepth={1} docked={true} >
                    <div style={{height: '64px', width: '100%', color: 'rgb(243,243,243)',
                        backgroundColor: 'rgb(70,77,91)', textAlign: 'center',
                        display: 'flex', justifyContent: 'center'
                        }}>
                        <h3>Saved Queries </h3>
                    </div>
                    <div style = {{height: '32px'}}></div>
                    {
                        this.props.saved_queries.map( loc => {
                            let key = loc.key
                            let query_item = this.props.saved_queries.filter(d => d.key == key)[0];
                            console.log(query_item.query);
                            var query = query_item.query;
                            return (
                                <div key={loc.name} style={{display: 'flex'}}>
                                    <Link to={'/timeline/'+ query} style={{textDecoration: 'none'}}>
                                    <MenuItem style={{width: '210px'}} id={loc.name}
                                              onClick={() => {
                                                this.props.dispatchApplyQueryCustom(query);
                                              }}
                                    > {loc.name} </MenuItem>
                                    </Link>
                                    <IconMenu
                                        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                                        anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                                        targetOrigin={{horizontal: 'left', vertical: 'top'}}
                                        style={{marginLeft: 'auto'}}
                                    >
                                        <MenuItem primaryText="Delete"
                                            onClick={() => {
                                                FIREBASE.database().ref('/queries/'+key).remove()
                                            }}/>
                                        <MenuItem primaryText="Edit"
                                                  onClick={() => {
                                                    this.props.dispatchTempQuery(this.props.query);
                                                    this.props.dispatchOpenQueryDialog()
                                            }}/>
                                    </IconMenu>
                                </div>
                            )
                    })}
                    <div style={{width:'100%', marginTop: '32px', display:'flex', justifyContent:'center'}}>
                        <RaisedButton label="Save Query"
                                  onClick={() => {
                                    this.props.dispatchTempQuery(this.props.query);
                                    this.props.dispatchOpenQueryDialog()
                                  }}/>
                    </div>


                </Drawer>

                <div style={{marginLeft: 256}}>
                    <div  style={appbarStyles.container}>

                        <Link className="MyLink" to={"/timeline/" + this.props.query}  >
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

    componentDidUpdate() {
        this._initIssues();
    }

    _initIssues() {
        // console.log('initIssues()');
        var url = 'http://localhost:8001/sample';
        fetch(url).then((data) => data.json())
            .then( (data) => {
                var items = this._formatIssues(data);
                this.props.dispatchReplaceIssues(items);
            });
        // var stem = 'https://jira.cxense.com/rest/api/2/search?jql='
        // var url = stem + this.props.query;
        // console.log(url);
        // var method = 'GET';
        //
        // var createCORSRequest = function(method, url) {
        //     var xhr = new XMLHttpRequest();
        //     xhr.open(method, url, true);
        //     xhr.setRequestHeader("Authorization", "Basic " + btoa("per.stromhaug:Qmkg9awn"));
        //     return xhr;
        // };
        //
        // var xhr = createCORSRequest(method, url);
        // xhr.onload = (data) => {
        //     console.log(JSON.parse(data.srcElement.response));
        //     data = JSON.parse(data.srcElement.response);
        //     data = this._formatIssues(data);
        //     this.props.dispatchAddIssues(data);
        // };
        // xhr.onerror = function() {
        //     window.alert("Not work");
        // };
        // xhr.send();




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

            var resolution = d.fields.resolution;
            var resname = null;
            if (resolution !== null && typeof resolution !== 'undefined') {
                resname = resolution.name;
            }

            var resolution2 = d.fields.customfield_10955;
            var resname2 = null;
            if (resolution2 !== null && typeof resolution2 !== 'undefined') {
                resname2 = resolution2.value;
            }

            return {
                lane: 0,
                name: d.fields.summary + " (" + d.fields.issuetype.name + ")",
                start: start,
                end: end,
                id: d.key,
                status: d.fields.status.name,
                remaining_estimate: time_left,
                planning_status: d.fields.status.description,
                resolution: resname,
                resolution2: resname2

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