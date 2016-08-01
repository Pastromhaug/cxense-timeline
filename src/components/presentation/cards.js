/**
 * Created by perandre on 6/9/16.
 */

import React from 'react';
import {cardStyles, cardHeaderStyles} from '../../styles/componentStyles';
import {Card, CardTitle} from 'material-ui/Card';
import VisibleTimelineTable from './../logic/visibleTimelineTable';
import VisibleMainChart from '../logic/visibleMainChart';
import {COLORS} from '../../constants/colorCode';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
// import saveSvgAsPng from 'save-svg-as-png';
var savesvg = require('save-svg-as-png');
var moment = require('moment');
var _ = require('lodash');
var d3 = require('d3');

class  Cards extends React.Component {

    constructor() {
        super();
        this._buildSprintIntervals.bind(this);
        this._buildQuarterIntervals.bind(this);
        this._downloadSvg.bind(this);
        this.sprintOrigin = moment.utc("2016-01-01");
        this.timeBegin = moment.utc().valueOf();
        this.timeEnd = moment.utc().valueOf();
    }

    _downloadSvg() {
        savesvg.saveSvgAsPng(document.getElementById("svg"), "timeline.png");
    }

    render() {
        return(
            <div>
                <Card style={cardStyles.container}>
                    <div
                        style={cardHeaderStyles}>
                        <CardTitle style={{padding: '0px', margin: '16px', marginRight: '50px'}}> {this.props.query} </CardTitle>
                        <IconMenu
                            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                            targetOrigin={{horizontal: 'left', vertical: 'top'}}
                            style={{marginLeft: 'auto'}}
                        >
                        <MenuItem primaryText="download as png"
                                  onClick={() => {
                                        this._downloadSvg()
                                    }}/>
                        </IconMenu>
                    </div>
                    <div style={{padding: '16px'}}>
                        <VisibleMainChart getColors={Cards.getColors}
                                          _timeBegin = {Cards._timeBegin}
                                          _timeEnd = {Cards._timeEnd}/>
                    </div>
                </Card>
                <Card style={cardStyles.container}>
                    <VisibleTimelineTable
                        _timeBegin = {Cards._timeBegin}
                        _timeEnd = {Cards._timeEnd}/>
                </Card>
            </div>
        );
    }

    componentDidMount() {
        var params = this.props.params;
        if (_.has(params, 'query')) {
            this.props.dispatchTempQuery(params.query);
        }
        this.props.dispatchApplyQuery();
    }

    componentDidUpdate() {
        this.timeBegin = Cards._timeBegin(this.props.issues);
        this.timeEnd = Cards._timeEnd(this.props.issues);
        var sprints = this._buildSprintIntervals();
        var quarters = this._buildQuarterIntervals(sprints);
        this.props.dispatchNewIntervals(sprints, quarters);
    }

    _buildSprintIntervals() {
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
    _buildQuarterIntervals(sprints) {
        var quarters = [];
        var prev_start = sprints[0].start;
        for (let i = 0; i < sprints.length; i++) {
            let curr_sprint = sprints[i];
            let curr_end = moment.utc(curr_sprint.end);
            let end_month = curr_end.clone().month();
            let dayOfMonth = (curr_end.clone().dayOfYear() - curr_end.clone().startOf('month').dayOfYear());
            if ( (end_month) % 3 === 0 && dayOfMonth < 14) {
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