/**
 * Created by perandre on 02.08.16.
 */

import React, {Component} from 'react';

import Utils from '../../js/utils';

import {connect} from 'react-redux';
import {actionSetAllChartState} from '../../actions/chart';
import {actionApplyQuery, actionTempQuery} from '../../actions/query';

var moment = require('moment');
var _ = require('lodash');
var d3 = require('d3');

/**
 * This is a non-UI component.
 *
 * Listents to: the selected query (state.query.query.query)
 * Computes: from the selected query, this component computes all the data structures
 *      that the chart uses to render the svg:
 *          issues, sprints, quarters, timeBegin, timeEnd
 *      It then updates the redux store contained in the  './reducers/chart' reducer.
 *
 * The point of this component is that other components can just update the query in the store,
 * and the rest of the work is done automatically by this component, that listens to the query
 * and then updates the chart state accordingly with the computed information.
 *
 * I could have just put this functionality in another component like AppContent, but I
 * found it cleaner and less cluttered to separate out this computational work.
 */

class _ChartStateController extends Component {
    render() {return (<div></div>)}

    constructor() {
        super();
        this._computeAndUpdateChartDataStructs.bind(this);
        this._buildQuarterIntervals.bind(this);
        this._buildSprintIntervals.bind(this);

        this.sprintOrigin = moment.utc("2016-01-01");
    }


    /**
     * Is called each time the query is updated in the redux store.
     */
    componentDidUpdate() {
        console.log('setIssuesSprintsQuarters updated');
        this._computeAndUpdateChartDataStructs(this.props.query)
    }

    /**
     *
     * @param query - the query which's data should be displayed in the chart
     *
     * Query's Jira for the issues described the argument 'query'.
     * Uses the retrieved Jira data to compute and update data structures
     */
    _computeAndUpdateChartDataStructs(query) {
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

    /**
     *
     * @param timeBegin - utc unix time in milliseconds that the 1st sprint should start before
     * @param timeEnd - utc unix time in milliseconds that the last sprint should end after
     * @returns {Array} of jsons - time interval for each sprint.
     * Contains fields 'start', 'end', and 'sprint_num'.
     * Each sprint is exactly 2 weeks long. Sprints are numbered every year, from 1-27ish.
     * @private
     */
    _buildSprintIntervals(timeBegin, timeEnd) {
        var sprints = [];
        // since sprints happen exactly ever 2 weeks, I need a starting point.
        // I stored this starting point in this.sprintOrigin. This is
        // a date that I know a sprint started on.
        var forwardOrigin = this.sprintOrigin.clone();

        // first loop forward from the origin until timeEnd is passed,
        // adding sprints to the 'sprints' array
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

        // loop backwards in time from the origin until timeBegin is passed
        // adding sprints to the 'sprints' array
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

    /**
     *
     * @param sprints - the sprint intervals calculated by _buildSprintIntervals
     * @returns {Array} of jsons - similar to the sprints input, the output is the intervals of
     * the quarters that overlap with the sprints. Sprints are needed to compute the quarters
     * because a quarter begins on the start date of the first sprint that has an end date within that
     * quarter of the year
     * @private
     */
    _buildQuarterIntervals(sprints) {
        if (sprints.length == 0) return [];
        var quarters = [];

        // loop through the sprints from start to finish (since the sprints are in order)
        // and create the quarter intervals
        var prev_start = sprints[0].start;
        for (let i = 0; i < sprints.length; i++) {
            let curr_sprint = sprints[i];
            let curr_end = moment.utc(curr_sprint.end);
            let end_month = curr_end.clone().month();
            let dayOfMonth = (curr_end.clone().dayOfYear() - curr_end.clone().startOf('month').dayOfYear());
            if ( (end_month) % 3 === 0 && dayOfMonth < 14) {
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

        // The last quarter must be computed separately due to the methodology I used to calculate
        // quarters 1 - (end-1) not working correctly for the last one.
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


    /**
     *
     * @param data - the raw json data returned by a jira query
     * @returns {Array} of properly formatted Issues (jsons) that the chart can directly use as input to display
     * the issues to the user, and that the table can use to display info about each issue.
     * Each issue in the returned array is 1 level deep json. Each field contains information used either
     * in drawing the svg (position, colors, labels etc.), or information
     * that is displayed in the table about the issue
     * @private
     */
    _formatIssues(data) {

        // filter out the issues that don't have a planned start and a planned end field.
        // These fields are represented in the jira response as 'custom fields'
        data = data.issues.filter( (d) => {
            return _.has(d.fields, 'customfield_10651') && _.has(d.fields, 'customfield_10652');});
        data = data.filter( (d) => {
            return (
                d.fields.customfield_10651 != null && typeof d.fields.customfield_10651 !== 'undefined'
                && d.fields.customfield_10652 != null && typeof d.fields.customfield_10652 !== 'undefined'
            )});

        // This map function goes through each issue, and formats the json data
        var formattedIssues = data.map( (d) => {
            // get fields planned_start and planned_end
            let planned_start = moment.utc(d.fields.customfield_10651).valueOf();
            let planned_end = moment.utc(d.fields.customfield_10652).valueOf();
            // calculate how much time is left in the issue, this will be field 'remaining_estimate'
            let time_left = 0;
            if (planned_end > moment.utc().valueOf()) time_left = planned_end - moment.utc().valueOf();

            // gets various fields from each jira issue, or null if the fields don't exist
            var resolution_name = this._getJsonFieldOrNull(d.fields,['resolution','name']);
            var resolution_name2 = this._getJsonFieldOrNull(d.fields,['customfield_10955','value']);
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

            // calculating the 'labels' field.
            // Each issue can have multipel labels, so here they are looped through and strung
            // together with separating commas.
            var labels = "";
            if (_.has(d.fields, 'labels')){
                for (let i = 0; i < d.fields.labels.length; i++){
                    let label = d.fields.labels[i];
                    if (labels !== "") {
                        labels = labels + ", ";
                    }
                    labels = labels + label;
                }
            }

            // The basic structure of each issue in the returned array
            return {
                lane: 0,
                name: summary + " (" + name + ")",
                start: planned_start,
                end: planned_end,
                id: id,
                status: status,
                remaining_estimate: time_left,
                planning_status: planning_status,
                resolution: resolution_name,
                resolution2: resolution_name2,
                reporter: reporter,
                reporter_email: reporter_email,
                created_at: created_at,
                updated_at: updated_at,
                priority: priority,
                labels: labels,
                security: security,
                security_description: security_description
            };});

        // sorting the issues by their planned_start and planned_end dates. This order impacts
        // how the lanes will be calculated below, so it's important they they are sorted optimally.
        // first I sort by the start data. Then by end date. This results in the issues being sorted
        // primarily by end date, but all issues that have the same end date are sorted by start date.
        formattedIssues = formattedIssues.sort( (a,b) => d3.ascending(a.start, b.start));
        formattedIssues = formattedIssues.sort( (a,b) => d3.ascending(a.end, b.end));

        // calculating the 'lane' field for each issue. Lane determines which row in the svg that the
        // issue is drawn on. It's important to not have overlapping issues in the chart, and to instead
        // move an issue which would overlap with another issue to another lane.
        var laneData = [];
        formattedIssues = formattedIssues.map( (new_item) => {
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
        // return the formatted issues
        return formattedIssues;
    }

    /**
     *
     * @param json - any json
     * @param fields - a list of strings. Each string represents a nested field in the json, nested
     * from left to right
     * @returns {*} whatever is contained at the desired nested field of the json, or null if the field
     * doesn't exist
     * @private
     */
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

function mapStateToProps(state) {
    return {
        query: state.query.query.query
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchSetAllChartState: (issues, sprints, quarters, timeBegin, timeEnd) => {
            dispatch(actionSetAllChartState(issues, sprints, quarters, timeBegin, timeEnd))
        },
        dispatchApplyQuery: () => {
            dispatch(actionApplyQuery())
        },
        dispatchTempQuery: (query) => {
            dispatch(actionTempQuery(query))
        }
    }
}

const ChartStateController = connect(
    mapStateToProps,
    mapDispatchToProps
)(_ChartStateController);

export default ChartStateController