/**
 * Created by perandre on 6/22/16.
 */

import React from 'react';
import VisibleMainChart from '../logic/visibleMainChart';
import VisibleMiniChart from '../logic/visibleMiniChart';
import VisibleMainAxis from '../logic/visibleMainAxis';
var moment = require('moment');


class MainContainer extends React.Component {

    constructor() {
        super();
        this.sprints = ['blablabla'];
        this.quarter = [];
        this.timeBegin = 0;
        this.timeEnd = 0;
        this._timeBegin.bind(this);
        this._timeEnd.bind(this);
    }

    render() {
        return (
            <div>
                <VisibleMainAxis sprints={this.sprints}/>
                <VisibleMainChart/>
                <VisibleMiniChart/>
            </div>
        );
    }


    _timeBegin() { return  d3.min(this.props.issues, (issue) => issue.start) }
    _timeEnd() { return  d3.max(this.props.issues, (issue) => issue.end) }

    //componentDidUpdate() {
    //    this.timeBegin = this._timeBegin();
    //    this.timeEnd = this._timeEnd()
    //
    //    var begin = moment.utc(this.timeBegin);
    //
    //    var thurs = begin.day(-3).startOf('day'); // get thursday before interval
    //    var sprintItems = [thurs.valueOf()];
    //    while (thurs.valueOf() < this.timeEnd) {
    //        sprintItems = sprintItems.concat([thurs.add(2, 'weeks').valueOf()])
    //    }
    //    //this.sprints = sprintItems;
    //}
}

export default MainContainer;