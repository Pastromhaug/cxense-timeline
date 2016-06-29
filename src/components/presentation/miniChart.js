/**
 * Created by perandre on 6/21/16.
 */
import React from 'react';
import ReactDOM from 'react-dom';
var d3 = require('d3');
var moment = require('moment');
require('../../styles/chartStyles.css');


class MiniChart extends React.Component {

    constructor() {
        super();
        this._chart_h.bind(this);
        this._lane_num.bind(this);
        this._x0.bind(this);
        this._x0.bind(this);
        this._svg.bind(this);
        this._displayFromBrush.bind(this);
        this._mini.bind(this);
        this._sprints.bind(this);
        this._w.bind(this);
        this._timeScale.bind(this);
        this._miniAxis.bind(this);
        this._svg_h.bind(this);

        this.top_pad =60;
        this.sprint_height = 20;
        this._brush = null;
        this.chartWidth = 0;
    }
    _w() { return  Math.max(this.chartWidth,0) }
    _chart_h() { return  this._lane_num() * 12 + 50}
    _svg_h() { return this._chart_h() + this.top_pad + this.sprint_height}
    _mini() { return  d3.select('#mini') }
    _sprints() { return  d3.select('#sprints')}
    _lane_num() {
        var max = d3.max(this.props.issues, (issue) => issue.lane + 1);
        if (typeof max === 'undefined') max = 0;
        return max  }
    _x0() { return (
        d3.scale.linear()
            .domain([this.props._timeBegin(this.props.issues),
                this.props._timeEnd(this.props.issues)])
            .range( [0, this._w() ] )
    )}
    _y2() { return (
        d3.scale.linear()
            .domain( [0, this._lane_num() ] )
            .range( [0, this._chart_h() ] )
    )}
    _timeScale() { return  (
        d3.time.scale.utc()
            .domain([new Date(this.props._timeBegin(this.props.issues)),
                new Date(this.props._timeEnd(this.props.issues))] )
            .range([0, this._w()])
    )}
    _miniAxis() { return (
        d3.svg.axis()
            .orient('top')
            .scale(this._timeScale())
            .ticks(d3.time.months)
            .tickFormat(d3.time.format('%B \'%y'))
            .tickSize(10,0.5)
            .tickPadding(0))
    }

    _svg() { return d3.select('#mini_svg')}

    componentDidMount() {
        this.chartWidth = document.getElementById('miniChart').offsetWidth;
        var elem = ReactDOM.findDOMNode(this);
        // console.log(4);
        d3.select(elem)
            .append("svg")
            .attr("id", "mini_svg")
            .style('width', '100%');
        // console.log(5);

        this._svg().append('g')
            .attr('class','sprints')
            .attr('id', 'sprints');

        this._sprints().append('g').attr('id','sprintRects');
        this._sprints().append('g').attr('id','sprintLabels');
        this._sprints().attr('transform', 'translate(0,' + this.top_pad + ')');


        this._svg().append("g")
            .attr("class", "mini")
            .attr("id","mini");

        // console.log(6);
        this._mini().append("g").attr("id", "miniItems");
        this._mini().append("g").attr("id", "miniRects");
        this._mini().append("g").attr("id", "miniLabels");
        this._mini().attr('transform', 'translate(0,' + (this.top_pad + this.sprint_height) + ')');

        this._brush = d3.svg.brush()
            .x(this._x0())
            .on("brush", this._displayFromBrush.bind(this ));

        // console.log(8);
        this._mini().append("g").attr('id','mybrush').attr("class", "x brush");
        // console.log(9);

        this._brush.extent([this.props.brush_start, this.props.brush_end]);
        this._mini().select('#mybrush').select(".brush")
            .call(this._brush);



    }

    componentDidUpdate() {

        this._svg().append('g').attr('id','miniAxis')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0, ' + 60  + ')')
            .attr('fontSize', 'smallest')
            .attr('fill','grey')
            .call(this._miniAxis());

        this._svg().attr("id", "svg")
            .attr("height", this._svg_h());

        this._mini()
            .attr("width", this._w() );

        var sprintRects = this._sprints().select('#sprintRects').selectAll('.sprintRect')
            .data(this.props.sprints, d => d.start);

        sprintRects.enter().append('rect')
            .attr('class', "sprintRect")
            .attr('x', (d) => this._x0()(d.start))
            .attr('y', (d) => this._y2()(0))
            .attr('width', d => this._x0()(d.end) - this._x0()(d.start))
            .attr('height', this.sprint_height);
        sprintRects.exit().remove();

        var sprintLabels = this._sprints().select('#sprintLabels').selectAll('text')
            .data(this.props.sprints, d => d.start);

        sprintLabels.enter().append('text')
            .text(d => d.sprint_num)
            .attr('class', 'sprintText')
            .attr('x', (d) => (this._x0()(d.start) + this._x0()(d.end))/2)
            .attr('y', (d) => this._y2()(0) + this.sprint_height)
            .attr('dy', -5)
            .attr("text-anchor", "middle");
        sprintLabels.exit().remove();

        var miniItems = this._mini().select("#miniItems").selectAll(".miniItems")
            .data(this.props.issues, d => d.name);
        miniItems.enter().append("rect")
            .attr("class", (d) => "miniItems miniItem")
            .attr("x", (d) => this._x0()(d.start))
            .attr("y", (d) => this._y2()(d.lane + .5) - 5)
            .attr("width", (d) => {
                // console.log(d.name);
                // console.log('status: ' + d.status);
                // console.log('res1: ' + d.resolution);
                // console.log('res2: ' + d.resolution2);
                return this._x0()(d.end) - this._x0()(d.start)
            })
            .attr("height", 10)
            .style('fill', (d) => {
                return this.props.getColors(d).backgroundColor
            });
        miniItems.exit().remove();

        this._brush
            .x(this._x0());

        this._mini().select("#mybrush")
            .call(this._brush)
            .selectAll("rect")
            .attr("y", 1 )
            .attr("height", this._chart_h() - 1 );

        d3.selectAll("#miniAxis > .tick > text")
            .style("font-size", 12);
    }

    _displayFromBrush() {
        var minExtent = this._brush.extent()[0],
            maxExtent = this._brush.extent()[1];

        this.props.dispatchBrushInterval(minExtent, maxExtent);
    }

    render() {
        return (
            <div id="miniChart" style={{width:'100%'}}></div>
        )
    }
}

export default MiniChart;