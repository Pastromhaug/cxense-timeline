/**
 * Created by perandre on 02.08.16.
 */

import React, {Component} from 'react';

import Utils from './utils';

var moment = require('moment');
var _ = require('lodash');
var d3 = require('d3');

export default class ChartStateController extends Component {
    render() {return (<div></div>)}

    constructor() {
        super();
        this._initIssuesSprintsAndQuarters.bind(this);
        this._buildQuarterIntervals.bind(this);
        this._buildSprintIntervals.bind(this);

        this.sprintOrigin = moment.utc("2016-01-01");
    }

    componentDidUpdate() {
        console.log('setIssuesSprintsQuarters updated');
        this._initIssuesSprintsAndQuarters(this.props.query)
    }

    _initIssuesSprintsAndQuarters(query) {
        var url = 'http://localhost:8001/sample';
        fetch(url).then((data) => data.json())
            .then( (data) => {

                const issues = this._formatIssues(data);
                const timeBegin = Utils.timeBegin(issues);
                const timeEnd = Utils.timeEnd(issues);
                const sprints = this._buildSprintIntervals(timeBegin, timeEnd);
                const quarters = this._buildQuarterIntervals(sprints);

                this.props.dispatchSetAllChartState(issues, sprints, quarters, timeBegin, timeEnd)
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

    _buildSprintIntervals(timeBegin, timeEnd) {
        var sprints = [];
        var forwardOrigin = this.sprintOrigin.clone();
        while (forwardOrigin.isBefore(timeEnd)) {
            let begin = forwardOrigin.clone();
            let end = forwardOrigin.add(14, 'days').clone();
            let sprint_num = Math.ceil(end.clone().subtract(1,'day').dayOfYear()/14);
            if (end.isAfter(timeBegin)){
                let new_interval = {
                    start: begin.valueOf(),
                    end: end.valueOf(),
                    sprint_num: sprint_num
                };
                sprints = sprints.concat([new_interval])
            }

        }
        var backwardOrigin = this.sprintOrigin.clone();
        while(backwardOrigin.isAfter(timeBegin)) {
            let end = backwardOrigin.clone();
            let begin = backwardOrigin.subtract(14, 'days').clone();
            let sprint_num = Math.ceil(end.clone().subtract(1,'day').dayOfYear()/14);
            if (begin.isBefore(timeEnd)) {
                let new_interval = {
                    start: begin.valueOf(),
                    end: end.valueOf(),
                    sprint_num: sprint_num
                };
                sprints = ([new_interval]).concat(sprints);
            }
        }
        return sprints;
    }


    _buildQuarterIntervals(sprints) {
        var quarters = [];
        var prev_start = sprints[0].start;
        console.log('prev_start: ' + Utils.getDate(prev_start));
        for (let i = 0; i < sprints.length; i++) {
            let curr_sprint = sprints[i];
            let curr_end = moment.utc(curr_sprint.end);
            let end_month = curr_end.clone().month();
            let dayOfMonth = (curr_end.clone().dayOfYear() - curr_end.clone().startOf('month').dayOfYear());
            if ( (end_month) % 3 === 0 && dayOfMonth < 14) {
                console.log('curr_sprint: ' + Utils.getDate(curr_sprint.start)
                    + " - " + Utils.getDate(curr_sprint.end));
                let quarter_num = (end_month)/3;
                if (quarter_num === 0) quarter_num = 4;
                var end = curr_sprint.start;
                if (dayOfMonth == 0) {
                    end = curr_sprint.end;
                }
                let new_quarter = {
                    start: prev_start,
                    end: end,
                    quarter_num: quarter_num
                };
                prev_start = new_quarter.end;
                quarters = quarters.concat([new_quarter])
            }
        }

        var last_quarter = quarters[quarters.length-1];
        var last_num = last_quarter.quarter_num;
        var new_last = last_num % 4  +1;
        var last_sprint = sprints[sprints.length -1];

        if (last_quarter.end < last_sprint.end) {
            var last_quarter = {
                start :last_quarter.end,
                end: last_sprint.end,
                quarter_num: new_last
            };
            quarters = quarters.concat([last_quarter]);
        }
        return quarters
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
            var labels = ""
            if (_.has(d.fields, 'labels')){
                for (let i = 0; i < d.fields.labels.length; i++){
                    let label = d.fields.labels[i];
                    if (labels !== "") {
                        labels = labels + ", ";
                    }
                    labels = labels + label;
                }
            }

            var priority = this._getJsonFieldOrNull(d.fields, ['priority','name']);
            var security = this._getJsonFieldOrNull(d.fields, ['security','name']);
            var security_description = this._getJsonFieldOrNull(d.fields, ['security', 'description']);
            var reporter = this._getJsonFieldOrNull(d.fields, ['reporter','displayName']);
            var reporter_email = this._getJsonFieldOrNull(d.fields, ['reporter','emailAddress']);
            var status = this._getJsonFieldOrNull(d.fields, ['status','name']);
            var planning_status = this._getJsonFieldOrNull(d.fields, ['customfield_10955','value']);
            var id = this._getJsonFieldOrNull(d, ['key']);
            var created_at = this._getJsonFieldOrNull(d.fields, ['created']);
            var updated_at = this._getJsonFieldOrNull(d.fields, ['updated']);
            var summary = this._getJsonFieldOrNull(d.fields, ['summary']);
            var name = this._getJsonFieldOrNull(d.fields, ['issuetype','name']);

            return {
                lane: 0,
                name: summary + " (" + name + ")",
                start: start,
                end: end,
                id: id,
                status: status,
                remaining_estimate: time_left,
                planning_status: planning_status,
                resolution: resname,
                resolution2: resname2,
                reporter: reporter,
                reporter_email: reporter_email,
                created_at: created_at,
                updated_at: updated_at,
                priority: priority,
                labels: labels,
                security: security,
                security_description: security_description
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


    _getJsonFieldOrNull(json, fields){
        var tempjson = json;
        for (let i = 0; i < fields.length; i++) {
            if (_.has(tempjson,fields[i])){
                tempjson = tempjson[fields[i]]
            } else{
                return null
            }
        }
        return tempjson;
    }
}