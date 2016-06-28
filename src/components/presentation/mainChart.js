/**
 * Created by perandre on 6/9/16.
 */
import React from 'react';
import ReactDOM from 'react-dom'
var d3 = require('d3');


class MainChart extends React.Component {

    constructor() {
        super();
        this._w.bind(this);
        this._chart_h.bind(this);
        this._lane_num.bind(this);
        this._x1.bind(this);
        this._y1.bind(this);
        this._main.bind(this);
        this._svg.bind(this);
        this._itemRects.bind(this);
        this. _updateRectangles.bind(this);
        this._svg_h.bind(this);
        this._timeScale.bind(this);
        this._mainAxis.bind(this);
        this._axis.bind(this);
        this._axis2.bind(this);
        this._timeScale2.bind(this);
        this._mainAxis2.bind(this);
        this._brush = null;
        this.chartWidth = 0;
        this.axis_pad = 50;
    }
    _axis() { return d3.select('#mainAxis')}
    _axis2() { return d3.select('#mainAxis2')}
    _timeScale() {
        return  (
            d3.time.scale.utc()
                .domain([new Date(this.props.brush_start), new Date(this.props.brush_end)] )
                .range([0, this._w()])
        )}
    _mainAxis() { return (
        d3.svg.axis()
            .orient('top')
            .scale(this._timeScale())
            .ticks(10)
            .tickFormat(d3.time.format('%d'))
            .tickSize(10,2)
            .tickPadding(3))
    }

    _timeScale2() {
        return  (
            d3.time.scale.utc()
                .domain([new Date(this.props.brush_start), new Date(this.props.brush_end)] )
                .range([0, this._w()]))}
    _mainAxis2() { return (
        d3.svg.axis()
            .orient('top')
            .scale(this._timeScale2())
            .ticks(d3.time.months, 1)
            .tickFormat(d3.time.format('%B'))
            .tickSize(10,2)
            .tickPadding(25))}

    _lane_num() {
        var max = d3.max(this.props.issues, (issue) => issue.lane + 1);
        if (typeof max === 'undefined') max = 0;
        return max  }
    _svg_h() { return this._chart_h() + this.axis_pad}
    _chart_h() { return  this._lane_num() * 60 }
    _w() { return  Math.max(this.chartWidth,0) }
    _x1() { return (
                d3.scale.linear()
                    .domain( [this.props.brush_start, this.props.brush_end])
                    .range( [0, this._w() ] )
        )}
    _y1() { return (
                d3.scale.linear()
                    .domain([0, this._lane_num() ])
                    .range([0, this._chart_h() ])
        )}
    _main() { return d3.select('#main_el') }
    _svg() { return d3.select('#svg')}
    _itemRects() { return  d3.select('#itemRects')}

    componentDidMount() {
        this.chartWidth = document.getElementById('mainChart').offsetWidth;
        var elem = ReactDOM.findDOMNode(this);
        d3.select(elem)
            .append("svg")
            .attr("id", "svg")
            .style('width', '100%');

        this._svg().append('g').attr('id', 'mainAxis')
            .attr('class', 'x axis');
        this._svg().append('g').attr('id', 'mainAxis2')
            .attr('class', 'x axis')

        this._svg().select('#mainAxis').attr('transform', 'translate(0, ' + 50  + ')');
        this._svg().select('#mainAxis2').attr('transform', 'translate(0, ' + 50  + ')');

        this._svg().append("g")
            .attr("class", "main")
            .attr("id", "main_el")
            .attr('transform', 'translate(0', + this.axis_pad + ')')
            .attr("height", this._chart_h() );

        this._main().append("g")
            .attr("id", "itemRects");

        this._updateRectangles();
    }

    componentDidUpdate() {

        this._axis()
            .call(this._mainAxis());
        this._axis2()
            .call(this._mainAxis2());

        //this._axis()
        //    .call(this._mainAxis2());

        this._svg().attr("id", "svg")
            .attr("height", this._svg_h() );

        this._main()
            .attr("width", this._w() )
            .attr("height", this._chart_h() )
            .attr('transform', 'translate(0,' + this.axis_pad + ')');


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
            .attr("x", (d) => this._x1()(d.start))
            .attr("y", (d) => this._y1()(d.lane) + 10)
            .attr("width", (d) => this._x1()(d.end) - this._x1()(d.start))
            .attr("height", (d) => .8 * this._y1()(1))
            .style('fill', (d) => {
                return this.props.getColors(d).backgroundColor
            });
        ;

        rects.exit().remove();

        //update the item labels
        var labels = this._itemRects().selectAll("text")
            .data(visItems, (d) => d.name)
            .attr("x", (d) => this._x1()(Math.max(d.start, this.props.brush_start) + 2))
            .attr('width', (d) =>
            this._x1()(Math.min(d.end, this.props.brush_end )) -
            this._x1()(Math.max(d.start, this.props.brush_start)))
            .style('fill', (d) => {
                return this.props.getColors(d).color
            });

        labels.enter().append("text")
            .text( (d) => d.name)
            .attr("x", (d) => this._x1()(Math.max(d.start, this.props.brush_end)))
            .attr("y", (d) => this._y1()(d.lane + .5))
            .attr("text-anchor", "start")
            .attr('width', (d) =>
            this._x1()(Math.min(d.end, this.props.brush_end )) -
            this._x1()(Math.max(d.start, this.props.brush_start)));

        labels.exit().remove();
    }


    render() {
        return(
            <div id="mainChart" style={{width:'100%'}}></div>
        )
    }
}

export default MainChart
