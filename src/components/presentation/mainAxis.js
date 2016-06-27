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
        this._quarterItems.bind(this);
        this._timeBegin.bind(this);
        this._timeEnd.bind(this);
        this.chartWidth = 0;
        this.h = 35;
    }

    _timeBegin() { return  d3.min(this.props.issues, (issue) => issue.start) }
    _timeEnd() { return  d3.max(this.props.issues, (issue) => issue.end) }
    _w() { return  Math.max(this.chartWidth,0) }
    _x1() { return (
        d3.scale.linear()
            .domain( [this.props.brush_start, this.props.brush_end])
            .range( [0, this._w() ] ) )}
    _quarterItems() {
        var quarter = moment.utc(this._timeBegin()).startOf('year'); // get thursday before interval
        var first_year = quarter.year();
        var quarters = [];
        var quart_cnt = 0;
        var end = moment.utc(this._timeEnd());
        while (quarter.valueOf() < end) {
            quart_cnt += 1;
            let quart_num = quart_cnt % 4 + 1;
            let quart_yr = Math.floor(quart_cnt / 4);
            quarters = quarters.concat([{
                start: quarter.valueOf(),
                end: quarter.add(3,'months').valueOf(),
                num: quart_num,
                yr: first_year + quart_yr
            }]);
        }
        return quarters;
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
    }

    componentDidUpdate() {
        MainAxis._axis().attr('width', this._w());
        var quartItems = this._quarterItems();
        quartItems = quartItems.filter( (q) => (
            q.start < this.props.brush_end && q.end > this.props.brush_start
        ));

        //console.log(quartItems);

        var quartRects = MainAxis._quartRects().selectAll('rect')
            .data(quartItems, d => d.start)
            .attr('width', d => (this._x1()(d.end) - this._x1()(d.start)))
            .attr('x', d => this._x1()(d.start))
            .attr('class', 'sprintRect')
            .attr('height', this.h)
            .attr('y', 0)
            .attr('style', {backgroundColor: 'blue'});

        quartRects.enter().append('rect');
        quartRects.exit().remove();

        var quartLabels = MainAxis._quartLabels().selectAll('text')
            .data(quartItems, d => d.start)
            .attr("x", (d) => this._x1()(
                (Math.max(d.start, this.props.brush_start ) + Math.min(d.end, this.props.brush_end))/2
            ))
            .attr('y',22)
            .attr('text-anchor', 'middle');

        quartLabels.enter().append('text').text( d => 'Q' + d.num + " " + d.yr);
        quartLabels.exit().remove();
    }

    render() {
        return (
            <div id="mainAxis">
                <svg id="axisSvg" style={{width: '100%'}}>
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