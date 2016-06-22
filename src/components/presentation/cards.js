/**
 * Created by perandre on 6/9/16.
 */

import React from 'react';
import {cardStyles} from '../../styles/componentStyles';
import {Card} from 'material-ui/Card';
import VisibleTimelineTable from './../logic/visibleTimelineTable';
import VisibleMainContainer from '../logic/visibleMainContainer';
var _ = require('lodash');

var moment = require('moment');

class  Cards extends React.Component {
    constructor() {
        super();
        this._initIssues.bind(this);
        this._formatIssues.bind(this);
    }

    render() {
        return(
            <div>
                <Card style={cardStyles.container}>
                    <VisibleMainContainer/>
                </Card>
                <Card style={cardStyles.container}>
                    <VisibleTimelineTable/>
                </Card>
            </div>
        );
    }

    componentDidMount() {
        this._initIssues();
    }

    componentDidUpdate() {
        this._initIssues();
    }

    _initIssues() {
        console.log(this.props.query);
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

            return {
                lane: 0,
                name: d.fields.summary + " (" + d.fields.issuetype.name + ")",
                start: start,
                end: end,
                id: d.key,
                status: d.fields.status.name,
                remaining_estimate: end - moment.utc().valueOf(),
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

export default Cards
