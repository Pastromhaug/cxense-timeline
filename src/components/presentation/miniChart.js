/**
 * Created by perandre on 6/21/16.
 */
import React from 'react';
import ReactDOM from 'react-dom'
var d3 = require('d3');
require('../../styles/chartStyles.css');

class MiniChart extends React.Component {

    constructor() {
        super();
        this._mini_h.bind(this);
        this._lane_num.bind(this);
        this._x0.bind(this);
        this._x0.bind(this);
        this._timeBegin.bind(this);
        this._timeEnd.bind(this);
        this._svg.bind(this);
        this._displayFromBrush.bind(this);
        this._mini.bind(this);
        this._w.bind(this);

        this._brush = null;
        this.chartWidth = 0;
    }
    _w() { return  Math.max(this.chartWidth,0) }
    _mini_h() { return  this._lane_num() * 12 + 50 }
    _mini() { return  d3.select('#mini') }
    _lane_num() {
        var max = d3.max(this.props.issues, (issue) => issue.lane + 1);
        if (typeof max === 'undefined') max = 0;
        return max  }
    _x0() { return (
        d3.scale.linear()
            .domain([this._timeBegin(), this._timeEnd()])
            .range( [0, this._w() ] )
    )}
    _y2() { return (
        d3.scale.linear()
            .domain( [0, this._lane_num() ] )
            .range( [0, this._mini_h() ] )
    )}
    _timeBegin() { return  d3.min(this.props.issues, (issue) => issue.start) }
    _timeEnd() { return  d3.max(this.props.issues, (issue) => issue.end) }
    _svg() { return d3.select('#mini_svg')}

    componentDidMount() {
        var elem = ReactDOM.findDOMNode(this);
        // console.log(4);
        d3.select(elem)
            .append("svg")
            .attr("id", "mini_svg");
        // console.log(5);
        this._svg().append("g")
            .attr("class", "mini")
            .attr("id","mini");
        // console.log(6);
        this._mini().append("g").attr("id", "miniItems");
        this._mini().append("g").attr("id", "miniRects");
        this._mini().append("g").attr("id", "miniLabels");

        this._brush = d3.svg.brush()
            .x(this._x0())
            .on("brush", this._displayFromBrush.bind(this ));

        // console.log(8);
        this._mini().append("g").attr('id','mybrush').attr("class", "x brush");
        // console.log(9);

        this._brush.extent([1469502356093.3433, 1471870222639.9736])
        this._mini().select('#mybrush').select(".brush")
            .call(this._brush);

        var minExtent = this._brush.extent()[0],
            maxExtent = this._brush.extent()[1];
    }

    componentDidUpdate() {
        this.chartWidth = document.getElementById('miniChart').offsetWidth;

        this._svg().attr("id", "svg")
            .attr("width", this._w())
            .attr("height", this._mini_h() );

        this._mini()
            .attr("width", this._w() );

        // console.log(1);
        var miniItems = this._mini().select("#miniItems").selectAll(".miniItems")
            .data(this.props.issues, d => d.name);
        miniItems.enter().append("rect")
            .attr("class", (d) => "miniItems miniItem" + d.lane)
            .attr("x", (d) => this._x0()(d.start))
            .attr("y", (d) => this._y2()(d.lane + .5) - 5)
            .attr("width", (d) => this._x0()(d.end) - this._x0()(d.start))
            .attr("height", 10);
        miniItems.exit().remove();
        // console.log(2);
        //mini labels
        var miniLabels = this._mini().select("#miniLabels").selectAll(".miniLabels")
            .data(this.props.issues, d => d.name);
        miniLabels.enter().append("text")
            .attr("class", "miniLabels")
            .text( (d) => d.name)
            .attr("x", (d) => this._x0()(d.start))
            .attr("y", (d) => this._y2()(d.lane + .5))
            .attr("dy", ".5ex");
        miniLabels.exit().remove();
        // console.log(3);

        this._brush
            .x(this._x0());

        this._mini().select("#mybrush")
            .call(this._brush)
            .selectAll("rect")
            .attr("y", 1)
            .attr("height", this._mini_h() - 1);
    }

    _displayFromBrush() {
        var minExtent = this._brush.extent()[0],
            maxExtent = this._brush.extent()[1];

        this.props.dispatchBrushInterval(minExtent, maxExtent);
    }

    render() {
        return (
            <div id="miniChart" style={{width:'100%', marginTop: '50px'}}></div>
        )
    }
}

export default MiniChart;