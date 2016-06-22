/**
 * Created by perandre on 6/22/16.
 */

import React from 'react';
var d3 = require('d3');
var moment = require('moment');
require('../../styles/chartStyles.css');

class MainAxis extends React.Component {

    constructor() {
        super();
        this._w.bind(this);
        this._x1.bind(this);
        this._sprintItems.bind(this);
        this.chartWidth = 0;
        this.h = 35;
    }

    _w() { return  Math.max(this.chartWidth,0) }
    _x1() { return (
        d3.scale.linear()
            .domain( [this.props.brush_start, this.props.brush_end])
            .range( [0, this._w() ] ) )}
    _sprintItems() {
        var brush_start = moment.utc(this.props.brush_start);
        var brush_end = moment.utc(this.props.brush_end);
        var thurs = brush_start.day(-3).startOf('day'); // get thursday before interval
        var sprintItems = [];

        while (thurs.valueOf() < brush_end) {
            sprintItems = sprintItems.concat([{
                start: thurs.valueOf(),
                end: thurs.add(2,'weeks').valueOf()
            }]);
        }

        console.log(sprintItems);
        return sprintItems;
    }

    static _svg() { return  d3.select('#axisSvg') }
    static _axis() { return d3.select('#axis')}
    static _sprintRects() { return d3.select('#sprintRects') }
    static _sprintLabels() { return d3.select('#sprintLabels') }
    static _quartRects() { return d3.select('#quartRects') }
    static _quartLabels() { return d3.select('#quartLabels')}


    componentDidMount() {
        this.chartWidth = document.getElementById('mainAxis').offsetWidth;
        MainAxis._svg().attr('height', this.h);
        MainAxis._axis().attr('height', this.h);
        console.log(this.props.sprints);
    }

    componentDidUpdate() {
        MainAxis._svg().attr('width', this._w());
        MainAxis._axis().attr('width', this._w());
        var sprintItems = this._sprintItems();

        var sprintRects = MainAxis._sprintRects().selectAll('rect')
            .data(sprintItems, d => d.start)
            .attr('width', d => (this._x1()(d.end) - this._x1()(d.start)))
            .attr('x', d => this._x1()(d.start));

        sprintRects.enter()
            .append('rect')
            .attr('class', 'sprintRect')
            .attr('height', this.h)
            .attr('width', d => (this._x1()(d.end) - this._x1()(d.start) - 100))
            .attr('x', d => this._x1()(d.start) + 5)
            .attr('y', 0)
            .attr('style', {backgroundColor: 'blue'});

        sprintRects.exit().remove();
    }

    render() {
        return (
            <div id="mainAxis">
                <svg id="axisSvg">
                    <g id ="axis">
                        <g id="sprintRects"/>
                        <g id="sprintLabels"/>
                        <g id="quartRects"/>
                        <g id="quartLabels"/>
                    </g>
                </svg>
            </div>
        )
    }
}

export default MainAxis;