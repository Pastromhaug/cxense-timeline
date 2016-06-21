/**
 * Created by perandre on 6/9/16.
 */

import React from 'react';
import ReactDOM from 'react-dom'
var d3 = require('d3');
var _ = require('lodash');
var moment = require('moment');
require('../../styles/chartStyles.css');

class MainChart extends React.Component {

    constructor() {
        super();
        this.createChartStructure.bind(this);
        this._displayFromBrush.bind(this);
        this._timeBegin.bind(this);
        this._timeEnd.bind(this);
        this._w.bind(this);
        this._h.bind(this);
        this._lane_num.bind(this);
        this._mini_h.bind(this);
        this._main_h.bind(this);
        this._clipPath.bind(this);
        this._x0.bind(this);
        this._x1.bind(this);
        this._y1.bind(this);
        this._y2.bind(this);
        this._mini.bind(this);
        this._main.bind(this);
        this._svg.bind(this);
        this._itemRects.bind(this);
        this. _updateRectangles.bind(this);
        this._brush = null;
        this._left_pad = 20;
        this._right_pad = 20;
        this._top_pad = 15;
        this._bot_pad = 15;
        this.chartWidth = 0;
    }

    _main_h() { return  this._h() - this._mini_h() - 50 }
    _mini_h() { return  this._lane_num() * 12 + 50 }
    _lane_num() {
        var max = d3.max(this.props.issues, (issue) => issue.lane);
        if (typeof max === 'undefined') max = 0;
        return max  }
    _h() { return  500 - this._top_pad - this._bot_pad }
    _w() { return  Math.max(this.chartWidth - this._right_pad - this._left_pad,0) }
    _x0() { return (
                d3.scale.linear()
                    .domain([this._timeBegin(), this._timeEnd()])
                    .range( [0, this._w() ] )
        )}
    _x1() { return (
                d3.scale.linear()
                    .domain( [this.props.brush_start, this.props.brush_end])
                    .range( [0, this._w() ] )
        )}
    _y1() { return (
                d3.scale.linear()
                    .domain([0, this._lane_num() ])
                    .range([0, this._main_h() ])
        )}
    _y2() { return (
                d3.scale.linear()
                    .domain( [0, this._lane_num() ] )
                    .range( [0, this._mini_h() ] )
        )}
    _timeBegin() { return  d3.min(this.props.issues, (issue) => issue.start) }
    _timeEnd() { return  d3.max(this.props.issues, (issue) => issue.end) }
    _mini() { return  d3.select('#mini') }
    _main() { return d3.select('#main') }
    _clipPath() { return d3.select('#clip')}
    _svg() { return d3.select('#svg')}
    _itemRects() { return  d3.select('#itemRects')}

    componentDidMount() {
        var elem = ReactDOM.findDOMNode(this);
        d3.select(elem)
            .append("svg")
            .attr("class", "mainChart")
            .attr("id", "svg");

        this._svg().append("defs").append("clipPath")
            .attr("id", "clip")
            .append("rect");

        var main = this._svg().append("g")
            .attr("transform", "translate(" + this._left_pad + "," + this._top_pad + ")")
            .attr("class", "main")
            .attr("id", "main");

        var mini = this._svg().append("g")
            .attr("class", "mini")
            .attr("id","mini");

        this._mini().append("g").attr("id", "miniItems");
    }

    componentDidUpdate() {
        this.chartWidth = document.getElementById('mainChart').offsetWidth;
        this.createChartStructure();
    }

    createChartStructure() {
        this._svg().attr("id", "svg")
            .attr("width", this._w() + this._left_pad + this._right_pad)
            .attr("height", this._h() + this._top_pad + this._bot_pad);;

        this._clipPath().select("rect")
            .attr("width", this._w() )
            .attr("height", this._main_h() );

       this._main()
            .attr("width", this._w() )
            .attr("height", this._main_h() );

        this._mini()
            .attr("transform", "translate(" + this._left_pad + "," + (this._main_h() + this._top_pad) + ")")
            .attr("width", this._w() )
            .attr("height", this._mini_h() )

        var itemRects = this._main().append("g")
            .attr("clip-path", "url(#clip)")
            .attr("id", "itemRects");

        this._mini().select("#miniItems").select("miniItems")
            .data(this.props.issues)
            .enter().append("rect")
            .attr("class", (d) => "miniItem" + d.lane)
            .attr("x", (d) => this._x0()(d.start))
            .attr("y", (d) => this._y2()(d.lane + .5) - 5)
            .attr("width", (d) => this._x0()(d.end) - this._x0()(d.start))
            .attr("height", 10);



        //mini item rects
        this._mini().append("g")
            .attr("id", "miniItems")
            .selectAll("miniItems")
            .data(this.props.issues)
            .enter().append("rect")
            .attr("class", (d) => "miniItem" + d.lane)
            .attr("x", (d) => this._x0()(d.start))
            .attr("y", (d) => this._y2()(d.lane + .5) - 5)
            .attr("width", (d) => this._x0()(d.end) - this._x0()(d.start))
            .attr("height", 10);

            //mini labels
        this._mini().append("g").selectAll(".miniLabels")
            .data(this.props.issues)
            .enter().append("text")
            .text( (d) => d.name)
            .attr("x", (d) => this._x0()(d.start))
            .attr("y", (d) => this._y2()(d.lane + .5))
            .attr("dy", ".5ex");

        this._brush = d3.svg.brush()
            .x(this._x0())
            .on("brush", this._displayFromBrush.bind(this ));

        this._mini().append("g")
            .attr("class", "x brush")
            .call(this._brush)
            .selectAll("rect")
            .attr("y", 1)
            .attr("height", this._mini_h() - 1);
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


    render() {
        return(
            <div id="mainChart" style={{width:'100%'}}></div>
        )
    }
}

export default MainChart
