/**
 * Created by perandre on 6/9/16.
 */
import React from 'react';
import ReactDOM from 'react-dom'
var d3 = require('d3');
require('../../styles/chartStyles.css');

class MainChart extends React.Component {

    constructor() {
        super();
        this._timeBegin.bind(this);
        this._timeEnd.bind(this);
        this._w.bind(this);
        this._h.bind(this);
        this._lane_num.bind(this);
        this._main_h.bind(this);
        this._clipPath.bind(this);
        this._x1.bind(this);
        this._y1.bind(this);
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

    _main_h() { return  this._h() -  50 }
    _lane_num() {
        var max = d3.max(this.props.issues, (issue) => issue.lane);
        if (typeof max === 'undefined') max = 0;
        return max  }
    _h() { return  500 - this._top_pad - this._bot_pad }
    _w() { return  Math.max(this.chartWidth - this._right_pad - this._left_pad,0) }
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
    _timeBegin() { return  d3.min(this.props.issues, (issue) => issue.start) }
    _timeEnd() { return  d3.max(this.props.issues, (issue) => issue.end) }
    _main() { return d3.select('#main_el') }
    _clipPath() { return d3.select('#clip')}
    _svg() { return d3.select('#svg')}
    _itemRects() { return  d3.select('#itemRects')}

    componentDidMount() {
        console.log('componentDidMount');
        var elem = ReactDOM.findDOMNode(this);
        d3.select(elem)
            .append("svg")
            .attr("id", "svg");

        this._svg().append("defs").append("clipPath")
            .attr("id", "clip")
            .append("rect");

        this._svg().append("g")
            .attr("transform", "translate(" + this._left_pad + "," + this._top_pad + ")")
            .attr("class", "main")
            .attr("id", "main_el");

        this._main().append("g")
            .attr("clip-path", "url(#clip)")
            .attr("id", "itemRects");
    }

    componentDidUpdate() {
        this.chartWidth = document.getElementById('mainChart').offsetWidth;

        this._svg().attr("id", "svg")
            .attr("width", this._w() + this._left_pad + this._right_pad)
            .attr("height", this._h() + this._top_pad + this._bot_pad);

        this._clipPath().select("rect")
            .attr("width", this._w() )
            .attr("height", this._main_h() );

       this._main()
            .attr("width", this._w() )
            .attr("height", this._main_h() );

        this._updateRectangles();
    }

    _updateRectangles() {
        var visItems = this.props.issues.filter(  (d) =>  (
            d.start < this.props.brush_end && d.end > this.props.brush_start)
        );
        var rects = this._itemRects().selectAll("rect")
            .data(visItems, (d) => d.name)
            .attr("x", (d) => this._x1()(d.start))
            .attr("width", (d) => this._x1()(d.end) - this._x1()(d.start));

        rects.enter().append("rect")
            .attr("class", (d) => "miniItem" + d.lane)
            .attr("x", (d) => this._x1()(d.start))
            .attr("y", (d) => this._y1()(d.lane) + 10)
            .attr("width", (d) => this._x1()(d.end) - this._x1()(d.start))
            .attr("height", (d) => .8 * this._y1()(1));

        rects.exit().remove();

        //update the item labels
        var labels = this._itemRects().selectAll("text")
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
