/**
 * Created by perandre on 6/9/16.
 */

import React from 'react';
import {cardStyles, cardHeaderStyles} from '../../styles/componentStyles';
import {Card, CardTitle} from 'material-ui/Card';
import VisibleTimelineTable from './../logic/visibleTimelineTable';
import VisibleMainChart from '../logic/visibleMainChart';
import VisibleMiniChart from '../logic/visibleMiniChart';
import {COLORS} from '../../constants/colorCode';
var moment = require('moment');

class  Cards extends React.Component {

    constructor() {
        super();
        this.buildSprintIntervals.bind(this);
        this.buildQuarterIntervals.bind(this);
        this.sprintOrigin = moment.utc("2016-01-01");
        this.timeBegin = moment.utc().valueOf();
        this.timeEnd = moment.utc().valueOf();
    }

    render() {
        return(
            <div>
                <Card style={cardStyles.container}>
                    <div
                        style={cardHeaderStyles}>
                        <CardTitle style={{padding: '0px'}}> {this.props.query} </CardTitle>
                    </div>
                    <div style={{padding: '16px'}}>
                        <VisibleMainChart getColors={Cards.getColors}/>
                        <VisibleMiniChart getColors={Cards.getColors}
                                        _timeBegin = {Cards._timeBegin}
                                        _timeEnd = {Cards._timeEnd}/>
                    </div>
                </Card>
                <Card style={cardStyles.container}>
                    <VisibleTimelineTable/>
                </Card>
            </div>
        );
    }

    componentDidUpdate() {
        this.timeBegin = Cards._timeBegin(this.props.issues);
        this.timeEnd = Cards._timeEnd(this.props.issues);
        var sprints = this.buildSprintIntervals();
        console.log(sprints.map( sprint => ( {
            start: moment.utc(sprint.start).format(),
            end: moment.utc(sprint.end).format()}
        )));
        var quarters = this.buildQuarterIntervals(sprints);
        this.props.dispatchNewIntervals(sprints, quarters);
    }

    buildSprintIntervals() {
        var sprints = [];
        var forwardOrigin = this.sprintOrigin.clone();
        while (forwardOrigin.isBefore(this.timeEnd)) {
            let begin = forwardOrigin.clone();
            let end = forwardOrigin.add(14, 'days').clone();
            let sprint_num = Math.ceil(end.clone().subtract(1,'day').dayOfYear()/14);
            if (end.isAfter(this.timeBegin)){
                let new_interval = {
                    start: begin.valueOf(),
                    end: end.valueOf(),
                    sprint_num: sprint_num
                };
                sprints = sprints.concat([new_interval])
            }

        }
        var backwardOrigin = this.sprintOrigin.clone();
        while(backwardOrigin.isAfter(this.timeBegin)) {
            let end = backwardOrigin.clone();
            let begin = backwardOrigin.subtract(14, 'days').clone();
            let sprint_num = Math.ceil(end.clone().subtract(1,'day').dayOfYear()/14);
            if (begin.isBefore(this.timeEnd)) {
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
    buildQuarterIntervals(sprints) {
        // console.log('sprints');
        // console.log(sprints);
        var quarters = [];
        var prev_start = sprints[0].start;
        for (let i = 0; i < sprints.length; i++) {
            let curr_sprint = sprints[i];
            let curr_end = moment.utc(curr_sprint.end);
            let end_month = curr_end.clone().month();
            let dayOfMonth = (curr_end.clone().dayOfYear() - curr_end.clone().startOf('month').dayOfYear());
            // console.log('next');
            // console.log(curr_end.clone().dayOfYear() + ' - ' + curr_end.clone().startOf('month').dayOfYear());
            // console.log(curr_end.format() + ' - ' + curr_end.startOf('month').format());
            if ( (end_month) % 3 === 0 && dayOfMonth < 14) {
                // console.log('end month: ' + end_month);
                // console.log('new quarter!!');
                // console.log(curr_end.clone().dayOfYear() + ' - ' + curr_end.clone().startOf('month').dayOfYear());
                // console.log(curr_end.format() + ' - ' + curr_end.startOf('month').format());
                let quarter_num = (end_month)/3;
                if (quarter_num === 0) quarter_num = 4;
                let new_quarter = {
                    start: prev_start,
                    end: curr_sprint.end,
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

        console.log('quarters:');
        console.log(quarters.map(q => {
            return ({
                start: moment.utc(q.start).format(),
                end: moment.utc(q.end).format(),
                num: q.quarter_num
            })
        }));
        return quarters
    }

    static _timeBegin(issues) {
        var min = d3.min(issues, (issue) => issue.start);
        min = Math.min(min, moment.utc().valueOf());
        var max = d3.max(issues, (issue) => issue.end);
        return min - (max - min)/20;
    }
    static _timeEnd(issues) {
        var max = d3.max(issues, (issue) => issue.end);
        max = Math.max(max, moment.utc().valueOf());
        var min = d3.min(issues, (issue) => issue.start);
        return max + (max - min)/20;
    }

    static getColors(issue) {
        var status1 = ['Resolved', 'Closed'];
        var group1 = ['None', 'Not started' + 'Functional spec in progress'];
        var group2 = ['Functional spec done', 'Dev planning in progress']
        if (status1.indexOf(issue.status) != -1 && issue.resolution === 'Fixed') {
            return COLORS.a;
        }
        else if (status1.indexOf(issue.status) != -1 && issue.resolution === "Won't Fix") {
            return COLORS.b;
        }
        else if (status1.indexOf(issue.status) == -1 &&
            (group1.indexOf(issue.resolution) != -1 || group1.indexOf(issue.resolution2) != -1)) {
            return COLORS.c;
        }
        else if (status1.indexOf(issue.status) == -1 &&
            (group2.indexOf(issue.resolution) != -1 || group2.indexOf(issue.resolution2) != -1)) {
            return COLORS.d;
        }
        else if (status1.indexOf(issue.status) == -1 &&
            (issue.resolution === 'Ready for coding' || issue.resolution2 === 'Ready for coding')) {
            return COLORS.e;
        }
        else if (status1.indexOf(issue.status) == -1 &&
            (issue.resolution === 'N/A' || issue.resolution2 === 'N/A')) {
            return COLORS.f;
        }
        else return COLORS.g;
    }
}

export default Cards

// <VisibleMainAxis style={{margin: '20px'}}/>