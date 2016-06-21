/**
 * Created by perandre on 6/9/16.
 */

import React from 'react';
import ReactDOM from 'react-dom'
var d3 = require('d3');
var _ = require('lodash');
var moment = require('moment');
require('../../styles/chartStyles.css');

class Chart extends React.Component {

    constructor() {
        super();

        this.formatIssues.bind(this);
        this.createChartStructure.bind(this);
        this.updateChartIssues.bind(this);
        this._displayFromBrush.bind(this);
        this._timeBegin.bind(this);
        this._timeEnd.bind(this);
        this._w.bind(this);
        this._h.bind(this);
        this._lane_num.bind(this);
        this._mini_h.bind(this);
        this._main_h.bind(this);
        this._x0.bind(this);
        this._x1.bind(this);
        this._y1.bind(this);
        this._y2.bind(this);
        this._mini.bind(this);
        this._itemRects.bind(this);
        this. _updateRectangles.bind(this);

        this._brush = null;

        // var m = [20, 15, 15, 20], //top right bottom left
        this._left_pad = 20;
        this._right_pad = 20;
        this._top_pad = 15;
        this._bot_pad = 15;

        this.chartWidth = 0;

    }

    _main_h() { return  this._h() - this._mini_h() - 50 }
    _mini_h() { return  this._lane_num() * 12 + 50 }
    _lane_num() { return  d3.max(this.props.issues, (issue) => issue.lane) }
    _h() { return  500 - this._top_pad - this._bot_pad }
    _w() { return  this.chartWidth - this._right_pad - this._left_pad }
    _x0() {
        // console.log('_x(): this._timeBegin(): ' + this._timeBegin())
        // console.log('_x(): this._timeEnd(): ' + this._timeEnd())
        // console.log('_x(): this._w(): ' + this._w())
        return (
            d3.scale.linear()
                .domain([this._timeBegin(), this._timeEnd()])
                .range( [0, this._w() ] )
        )}
    _x1() {
        return (
            d3.scale.linear()
                .domain( [this.props.brush_start, this.props.brush_end])
                .range( [0, this._w() ] )
        )}
    _y1() {
        return (
            d3.scale.linear()
                .domain([0, this._lane_num() ])
                .range([0, this._main_h() ])
        )}
    _y2() {
        return (
            d3.scale.linear()
                .domain( [0, this._lane_num() ] )
                .range( [0, this._mini_h() ] )
        )}
    _timeBegin() {
        return d3.min(this.props.issues, (issue) => issue.start) }

    _timeEnd() {
        return d3.max(this.props.issues, (issue) => issue.end) }
    _mini() { return  d3.select('#mini')}
    _itemRects() { return  d3.select('#itemRects')}


    componentDidUpdate() {
        var chart = ReactDOM.findDOMNode(this);
        this.updateChartIssues(chart);
    }

    componentDidMount() {
        this.chartWidth = document.getElementById('chart').offsetWidth
        var chart = ReactDOM.findDOMNode(this);
        this.createChartStructure(chart);
    }

    updateChartIssues(elem) {
        var chart = d3.select(elem);

    }


    createChartStructure(elem) {
        fetch('http://localhost:8001/sample').then((data) => data.json())
    .then( (data) => {

            var items = this.formatIssues(data);
        this.props.dispatchAddIssues(items);
        var items = this.props.issues;

        var chart = d3.select(elem)
            .append("svg")
            .attr("width", this._w() + this._left_pad + this._right_pad)
            .attr("height", this._h() + this._top_pad + this._bot_pad)
            .attr("class", "chart");

        chart.append("defs").append("clipPath")
            .attr("id", "clip")
            .append("rect")
            .attr("width", this._w() )
            .attr("height", this._main_h() );

        var main = chart.append("g")
            .attr("transform", "translate(" + this._left_pad + "," + this._top_pad + ")")
            .attr("width", this._w() )
            .attr("height", this._main_h() )
            .attr("class", "main");

        var mini = chart.append("g")
            .attr("transform", "translate(" + this._left_pad + "," + (this._main_h() + this._top_pad) + ")")
            .attr("width", this._w() )
            .attr("height", this._mini_h() )
            .attr("class", "mini")
            .attr("id","mini");

        var itemRects = main.append("g")
            .attr("clip-path", "url(#clip)")
            .attr("id", "itemRects");

        //mini item rects
        mini.append("g").selectAll("miniItems")
            .data(items)
            .enter().append("rect")
            .attr("class", (d) => "miniItem" + d.lane)
    .attr("x", (d) => this._x0()(d.start))
    .attr("y", (d) => this._y2()(d.lane + .5) - 5)
    .attr("width", (d) => this._x0()(d.end) - this._x0()(d.start))
    .attr("height", 10);

        //mini labels
        mini.append("g").selectAll(".miniLabels")
            .data(items)
            .enter().append("text")
            .text( (d) => d.name)
    .attr("x", (d) => this._x0()(d.start))
    .attr("y", (d) => this._y2()(d.lane + .5))
    .attr("dy", ".5ex");

        this._brush = d3.svg.brush()
            .x(this._x0())
            .on("brush", this._displayFromBrush.bind(this ));

        mini.append("g")
            .attr("class", "x brush")
            .call(this._brush)
            .selectAll("rect")
            .attr("y", 1)
            .attr("height", this._mini_h() - 1);
    })
    }

    _displayFromBrush() {
        var minExtent = this._brush.extent()[0],
            maxExtent = this._brush.extent()[1];
        this.props.dispatchBrushInterval(minExtent, maxExtent);
        this._updateRectangles();
    }

    _updateRectangles() {
        var rects, labels;
        var visItems = this.props.issues.filter(  (d) =>  (
            d.start < this.props.brush_end && d.end > this.props.brush_start)
        );
        rects = this._itemRects().selectAll("rect")
            .data(visItems, (d) => d.name)
            .attr("x", (d) => this._x1()(d.start))
            .attr("width", (d) =>  this._x1()(d.end) - this._x1()(d.start));

        rects.enter().append("rect")
            .attr("class", (d) => "miniItem" + d.lane)
            .attr("x", (d) => this._x1()(d.start))
            .attr("y", (d) => this._y1()(d.lane) + 10)
            .attr("width", (d) => this._x1()(d.end) - this._x1()(d.start))
            .attr("height", (d) => .8 * this._y1()(1));

        rects.exit().remove();

        //update the item labels
        labels = this._itemRects().selectAll("text")
            .data(visItems, (d) => d.name)
            .attr("x", (d) => this._x1()(Math.max(d.start, this.props.brush_start) + 2));

        labels.enter().append("text")
            .text( (d) => d.name)
            .attr("x", (d) => this._x1()(Math.max(d.start, this.props.brush_end)))
            .attr("y", (d) => this._y1()(d.lane + .5))
            .attr("text-anchor", "start");

        labels.exit().remove();
    }


    formatIssues(data) {
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
            name: d.fields.summary,
            start: start,
            end: end,

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


    render() {
        return(
            <div id="chart" style={{width:'100%'}}></div>
        )
    }
}

export default Chart
