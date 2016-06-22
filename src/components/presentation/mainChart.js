/**
 * Created by perandre on 6/9/16.
 */
import React from 'react';
import ReactDOM from 'react-dom'
var d3 = require('d3');


class MainChart extends React.Component {

    constructor() {
        super();
        this._timeBegin.bind(this);
        this._timeEnd.bind(this);
        this._w.bind(this);
        this._h.bind(this);
        this._lane_num.bind(this);
        this._x1.bind(this);
        this._y1.bind(this);
        this._main.bind(this);
        this._svg.bind(this);
        this._itemRects.bind(this);
        this. _updateRectangles.bind(this);
        this._brush = null;
        this.chartWidth = 0;
    }
    _lane_num() {
        var max = d3.max(this.props.issues, (issue) => issue.lane + 1);
        if (typeof max === 'undefined') max = 0;
        return max  }
    _h() { return  this._lane_num() * 60 }
    _w() { return  Math.max(this.chartWidth,0) }
    _x1() { return (
                d3.scale.linear()
                    .domain( [this.props.brush_start, this.props.brush_end])
                    .range( [0, this._w() ] )
        )}
    _y1() { return (
                d3.scale.linear()
                    .domain([0, this._lane_num() ])
                    .range([0, this._h() ])
        )}
    _timeBegin() { return  d3.min(this.props.issues, (issue) => issue.start) }
    _timeEnd() { return  d3.max(this.props.issues, (issue) => issue.end) }
    _main() { return d3.select('#main_el') }
    _svg() { return d3.select('#svg')}
    _itemRects() { return  d3.select('#itemRects')}

    componentDidMount() {
        var elem = ReactDOM.findDOMNode(this);
        d3.select(elem)
            .append("svg")
            .attr("id", "svg");

        this._svg().append("g")
            .attr("class", "main")
            .attr("id", "main_el");

        this._main().append("g")
            .attr("id", "itemRects");
    }

    componentDidUpdate() {
        this.chartWidth = document.getElementById('mainChart').offsetWidth;

        this._svg().attr("id", "svg")
            .attr("width", this._w() )
            .attr("height", this._h() );

       this._main()
            .attr("width", this._w() )
            .attr("height", this._h() );

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
