/**
 * Created by perandre on 6/9/16.
 */
import React from 'react';
import ReactDOM from 'react-dom'
var d3 = require('d3');
var moment = require('moment');


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
        this._sprints.bind(this);
        this._updateSprints.bind(this);
        this._quarters.bind(this);
        this._updateQuarters.bind(this);
        this._updateTodayLine.bind(this);
        this._brush = null;
        this.chartWidth = 0;
        this.axis_pad = 50;
        this.sprint_height = 25;
        this.quarter_height = 25;
    }
    _axis() { return d3.select('#mainAxis')}
    _quarters() {return d3.select('#quartersMain')}
    _sprints() { return  d3.select('#sprintsMain')}
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
            .tickFormat(d3.time.format("%d %b"))
            .tickSize(2)
            .innerTickSize(4)
            .tickPadding(3))
    }

    _lane_num() {
        var max = d3.max(this.props.issues, (issue) => issue.lane + 1);
        if (typeof max === 'undefined') max = 0;
        return max  }
    _svg_h() { return this._chart_h() + this.axis_pad + this.sprint_height + this.quarter_height}
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

        this._svg().append('g')
            .attr('class','sprintsMain')
            .attr('id', 'sprintsMain');

        this._svg().append('g')
            .attr('class','quartersMain')
            .attr('id', 'quartersMain');

        this._sprints().append('g').attr('id','sprintRectsMain');
        this._sprints().append('g').attr('id','sprintLabelsMain');
        this._sprints().attr('transform', 'translate(0,' + (this.axis_pad + this.quarter_height) + ')');

        this._quarters().append('g').attr('id', 'quarterRectsMain');
        this._quarters().append('g').attr('id', 'quarterLabelsMain');
        this._quarters().attr('transform', 'translate(0,' + this.axis_pad + ')');

        this._svg().append('g').attr('id', 'mainAxis')
            .attr('class', 'x axis')
            .attr('fill','grey');

        this._svg().select('#mainAxis').attr('transform', 'translate(0, ' + 50  + ')');
        this._svg().select('#mainAxis2').attr('transform', 'translate(0, ' + 50  + ')');

        this._svg().append("g")
            .attr("class", "main")
            .attr("id", "main_el")
            .attr('transform', 'translate(0,' + (this.axis_pad + this.sprint_height + this.quarter_height) + ')')
            .attr("height", this._chart_h() );

        this._main().append("g")
            .attr("id", "itemRects");

        this._updateSprints();
        this._updateQuarters();
        this._updateRectangles();
        this._main().append("line");
    }

    componentDidUpdate() {
        this._axis()
            .call(this._mainAxis());

        this._svg().attr("id", "svg")
            .attr("height", this._svg_h() );

        this._main()
            .attr("width", this._w() )
            .attr("height", this._chart_h() )


        this._updateSprints();
        this._updateQuarters();
        this._updateRectangles();
        this._updateTodayLine();
    }

    _updateTodayLine() {
        var today = moment.utc().valueOf();
        this._main().select("line")
            .attr('class', 'todayLineMain')
            .attr("x1", this._x1()(today))  //<<== change your code here
            .attr("y1", -100)
            .attr("x2", this._x1()(today))  //<<== and here
            .attr("y2", this._chart_h() + 200)
            .style("stroke-width", 2)
            .style("stroke", "green")
            .style("fill", "none");
    }

    _updateQuarters() {
        var visItems = this.props.quarters.filter(  (d) =>  (
            d.start < this.props.brush_end && d.end > this.props.brush_start)
        );
        var quarterRects = this._quarters().select('#quarterRectsMain').selectAll('.quarterRectMain')
            .data(visItems, d => d.start)
            .attr('x', (d) =>  this._x1()(d.start))
            .attr('width', d => this._x1()(d.end) - this._x1()(d.start));

        quarterRects.enter().append('rect')
            .attr('class', "quarterRectMain")
            .attr('x', (d) => {
                return this._x1()(d.start)
            })
            .attr('y', 0)
            .attr('width', d => this._x1()(d.end) - this._x1()(d.start))
            .attr('height', this.quarter_height);
        quarterRects.exit().remove();

        var quarterLabels = this._quarters().select('#quarterLabelsMain').selectAll('text')
            .data(visItems, d => d.start)
            .attr('x', (d) => (this._x1()(d.start) + this._x1()(d.end))/2);

        quarterLabels.enter().append('text')
            .text(d => {
                let year = moment.utc(d.start).year();
                return 'Q' + d.quarter_num + '  ' + year;
            })
            .attr('class', 'quarterTextMain')
            .attr('x', (d) => (this._x1()(d.start) + this._x1()(d.end))/2)
            .attr('y', (d) => this.quarter_height)
            .attr('dy', -7)
            .attr("text-anchor", "middle");
        quarterLabels.exit().remove();
    }

    _updateSprints() {
        var visItems = this.props.sprints.filter(  (d) =>  (
            d.start < this.props.brush_end && d.end > this.props.brush_start)
        );
        var sprintRects = this._sprints().select('#sprintRectsMain').selectAll('.sprintRectMain')
            .data(visItems, d => d.start)
            .attr('x', (d) =>  this._x1()(d.start))
            .attr('width', d => this._x1()(d.end) - this._x1()(d.start));

        sprintRects.enter().append('rect')
            .attr('class', "sprintRectMain")
            .attr('x', (d) => {
                return this._x1()(d.start)
            })
            .attr('y', 0)
            .attr('width', d => this._x1()(d.end) - this._x1()(d.start))
            .attr('height', this.sprint_height);
        sprintRects.exit().remove();

        var sprintLabels = this._sprints().select('#sprintLabelsMain').selectAll('text')
            .data(visItems, d => d.start)
            .attr('x', (d) => (this._x1()(d.start) + this._x1()(d.end))/2);

        sprintLabels.enter().append('text')
            .text(d => 'T'+d.sprint_num)
            .attr('class', 'sprintTextMain')
            .attr('x', (d) => (this._x1()(d.start) + this._x1()(d.end))/2)
            .attr('y', (d) => this._y1()(0) + this.sprint_height)
            .attr('dy', -6)
            .attr("text-anchor", "middle");
        sprintLabels.exit().remove();

    }

    _updateRectangles() {
        var visItems = this.props.issues.filter(  (d) =>  (
            d.start < this.props.brush_end && d.end > this.props.brush_start)
        );
        var rects = this._itemRects().selectAll("rect")
            .data(visItems, (d) => d.name)
            .attr("x", (d) => this._x1()(d.start))
            .attr("y", (d) => this._y1()(d.lane) + 10)
            .attr("width", (d) => this._x1()(d.end) - this._x1()(d.start))
            .attr("height", (d) => .8 * this._y1()(1))
            .attr('id', d => 'rect-' + d.id)
            .style('fill', (d) => {
                return this.props.getColors(d).backgroundColor
            })
            .on('mouseover', (d) => {
                d3.select('#rect-' + d.id).attr('fill-opacity', 0.7);
                d3.select('#rect-' + d.id).attr('cursor','pointer');
                this.props.dispatchHoverOnIssue(d.id);
            })
            .on('mouseout', (d) => {
                d3.select('#rect-' + d.id).attr('fill-opacity', 1);
                this.props.dispatchHoverOnIssue(null);
            })
            .on('click', (d) => {
                window.open("https://jira.cxense.com/browse/" + d.id + "?jql=issue=" + d.id ,'_blank');
            });

        rects.enter().append("rect")
            .attr("x", (d) => this._x1()(d.start))
            .attr("y", (d) => this._y1()(d.lane) + 10)
            .attr("width", (d) => this._x1()(d.end) - this._x1()(d.start))
            .attr("height", (d) => .8 * this._y1()(1))
            .attr('id', d => 'rect-' + d.id)
            .style('fill', (d) => {
                return this.props.getColors(d).backgroundColor
            })
            .on('mouseover', (d) => {
                d3.select('#rect-' + d.id).attr('fill-opacity', 0.7);
                d3.select('#rect-' + d.id).attr('cursor','pointer');
                this.props.dispatchHoverOnIssue(d.id);
            })
            .on('mouseout', (d) => {
                d3.select('#rect-' + d.id).attr('fill-opacity', 1);
                this.props.dispatchHoverOnIssue(null);
            })
            .on('click', (d) => {
                window.open("https://jira.cxense.com/browse/" + d.id + "?jql=issue=" + d.id ,'_blank');
            });

        rects.exit().remove();

        var clippaths = this._itemRects().selectAll('clipPath')
            .data(visItems, d => d.name);

        clippaths
            .append('rect')
            .attr("x", (d) => this._x1()(Math.max(d.start, this.props.brush_start)))
            .attr("y", (d) => this._y1()(d.lane))
            .attr('width', (d) =>
                this._x1()(Math.min(d.end, this.props.brush_end )) -
                this._x1()(Math.max(d.start, this.props.brush_start)) - 5)
            .attr("height", (d) => .8 * this._y1()(1));

        clippaths.enter().append('clipPath')
            .attr( 'id', d => d.id)
            .append('rect')
            .attr("x", (d) => this._x1()(Math.max(d.start, this.props.brush_start)))
            .attr("y", (d) => this._y1()(d.lane))
            .attr('width', (d) =>
                this._x1()(Math.min(d.end, this.props.brush_end )) -
                this._x1()(Math.max(d.start, this.props.brush_start)))
            .attr("height", (d) => .8 * this._y1()(1));

        clippaths.exit().remove();


        //update the item labels
        var labels = this._itemRects().selectAll("text")
            .data(visItems, (d) => d.name)
            .text( (d) => d.name)
            .attr("x", (d) => {
                return this._x1()(Math.max(d.start, this.props.brush_start) + 2)
            })
            .attr("y", (d) => this._y1()(d.lane + .5))
            .attr('dx', 5)
            .attr('dy', 7)
            .attr("clip-path", d => ("url(#" + d.id + ")"))
            .style('fill', (d) => {
                return this.props.getColors(d).color
            })
            .on('mouseover', (d) => {
                d3.select('#rect-' + d.id).attr('fill-opacity', 0.7);
                d3.select('#rect-' + d.id).attr('cursor','pointer !important');
                this.props.dispatchHoverOnIssue(d.id);
            })
            .on('mouseout', (d) => {
                d3.select('#rect-' + d.id).attr('fill-opacity', 1);
                this.props.dispatchHoverOnIssue(null)
            })
            .on('click', (d) => {
                window.open("https://jira.cxense.com/browse/" + d.id + "?jql=issue=" + d.id ,'_blank');
            });

        labels.enter().append("text")
            .text( (d) => d.name)
            .attr("x", (d) => this._x1()(Math.max(d.start, this.props.brush_end)))
            .attr("y", (d) => this._y1()(d.lane + .5))
            .attr('dx', 5)
            .attr('dy', 7)
            .attr("text-anchor", "start")
            .attr("clip-path", d => ("url(#" + d.id + ")"))
            .on('mouseover', (d) => {
                d3.select('#rect-' + d.id).attr('fill-opacity', 0.7);
                d3.select('#rect-' + d.id).attr('cursor','pointer !important');
                this.props.dispatchHoverOnIssue(d.id);
            })
            .on('mouseout', (d) => {
                d3.select('#rect-' + d.id).attr('fill-opacity', 1);
                this.props.dispatchHoverOnIssue(null)
            })
            .on('click', (d) => {
                window.open("https://jira.cxense.com/browse/" + d.id + "?jql=issue=" + d.id ,'_blank');
            });

        labels.exit().remove();
    }


    render() {
        return(
            <div id="mainChart" style={{width:'100%'}}></div>
        )
    }
}

export default MainChart
