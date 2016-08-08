/**
 * Created by perandre on 6/9/16.
 */
import React from 'react';
import ReactDOM from 'react-dom'
import Utils from '../../js/utils';
var d3 = require('d3');
var moment = require('moment');
require('../../styles/chartStyles.css');

import { connect } from 'react-redux';
import {actionHoverOnIssue} from '../../actions/table';
import {actionLoadingStop} from '../../actions/loading';


/**
 * This component is the chart svg, which is sort of the whole point of this app.
 */

class _Chart extends React.Component {

    constructor() {
        super();
        this._w.bind(this);
        this._chart_h.bind(this);
        this._lane_num.bind(this);
        this._x1.bind(this);
        this._y1.bind(this);
        this._issues.bind(this);
        this._background.bind(this);
        this._svg.bind(this);
        this._issueRects.bind(this);
        this._issueLabels.bind(this);
        this._updateIssueRects.bind(this);
        this._updateIssueLabels.bind(this);
        this._updateIssueClipPaths.bind(this);
        this._svg_h.bind(this);
        this._axis.bind(this);
        this._sprints.bind(this);
        this._todayLine.bind(this);
        this._updateSprints.bind(this);
        this._updateAxis.bind(this);
        this._quarters.bind(this);
        this._updateQuarters.bind(this);
        this._updateTodayLine.bind(this);
        this._updateWidth.bind(this);
        this._updateBackground.bind(this);
        this._quarterLabels.bind(this);
        this._quarterRects.bind(this);
        this._sprintLabels.bind(this);
        this._sprintRects.bind(this);
        this._axisLabels.bind(this);
        this.axis_pad = 50;
        this.sprint_height = 25;
        this.quarter_height = 25;

        this.state = {
            width: 0
        };
    }
    _quarters() {return d3.select('#quarters')}
    _sprints() { return  d3.select('#sprints')}
    _axis() { return d3.select('#axis')}
    _issues() { return d3.select('#issues') }
    _background() {return d3.select('#background')}

    _lane_num() {
        var max = d3.max(this.props.chart.issues, (issue) => issue.lane + 1);
        if (typeof max === 'undefined') max = 0;
        return max  }
    _svg_h() { return this._chart_h() + this.axis_pad + this.sprint_height + this.quarter_height}
    _chart_h() { return  this._lane_num() * 60 }
    _w() { return  Math.max(this.state.width,0) }
    _x1() { return (
                d3.scale.linear()
                    .domain( [this.props.chart.timeBegin, this.props.chart.timeEnd])
                    .range( [0, this._w() ] )
        )}
    _y1() { return (
                d3.scale.linear()
                    .domain([0, this._lane_num() ])
                    .range([0, this._chart_h() ])
        )}
    _svg() { return d3.select('#svg')}
    _issueRects() { return  d3.select('#issueRects')}
    _issueLabels() { return d3.select('#issueLabels')}
    _quarterRects() {return d3.select('#quarterRects')}
    _quarterLabels() {return d3.select('#quarterLabels')}
    _sprintRects() {return d3.select('#sprintRects')}
    _sprintLabels() {return d3.select('#sprintLabels')}
    _todayLine() {return d3.select('#todayLine')}
    _axisLabels() {return d3.select('#axisLabels')}

    componentDidMount() {
        this._updateWidth();
        d3.select('#svg').style('width', '100%');

        // appending the groups for the white background, sprints, quarters, and axis, and issues
        this._svg().append('rect').attr('id','background'); // background only necessary b/c of png export
        this._svg().append('g').attr('id','axis');
        this._svg().append('g').attr('id', 'quarters');
        this._svg().append('g').attr('id', 'sprints');
        this._svg().append("g").attr("id", "issues");
        // add the vertical line representing the current date
        this._svg().append("line").attr("id", "todayLine");

        // change the background color of the background so that the pngs exports get
        // a white background
        this._background().attr('fill','white');

        // add a group to hold the labels for the axis
        this._axis().append('g').attr('id', 'axisLabels');
        // shift the axis down to the quarters
        this._axis().attr('transform','translate(0,' + (this.axis_pad - 4) + ')');

        // add groups to hold the rectangles and the labels for the sprints
        this._quarters().append('g').attr('id', 'quarterRects');
        this._quarters().append('g').attr('id', 'quarterLabels');
        // shift the quarters down below the axis
        this._quarters().attr('transform', 'translate(0,' + this.axis_pad + ')');

        // add groups to hold the rectangles and the labels for the sprints
        this._sprints().append('g').attr('id','sprintRects');
        this._sprints().append('g').attr('id','sprintLabels');
        // shift the sprints down below the axis and quarters
        this._sprints().attr('transform', 'translate(0,' + (this.axis_pad + this.quarter_height) + ')');

        // add groups for the
        this._issues().append("g").attr("id", "issueRects");
        this._issues().append("g").attr("id", "issueLabels");
        // shift the issues down below the axis, quarters, and sprints.
        this._issues().attr('transform', 'translate(0,'+(this.axis_pad+this.sprint_height+this.quarter_height)+')');

        this._todayLine()
            .style("stroke-width", 2)
            .style("stroke", "steelblue")
            .style("fill", "none");
        // listener to update the state whenever the width of the page changes so that
        // the svg resizes its self properly.
        window.addEventListener("resize", this._updateWidth.bind(this));
    }

    /**
     * changes this.state.width so that component updates
     * @private
     */
    _updateWidth() {
        this.setState({width: document.getElementById('mainChart').offsetWidth});
    }

    /**
     * update all parts of the svg to fit the new data
     */
    componentDidUpdate() {
        this._svg().attr("id", "svg")
            .attr("height", this._svg_h() )
            .attr('fill', 'white');
        this._updateBackground();
        this._updateAxis();
        this._updateSprints();
        this._updateQuarters();
        this._updateIssueRects();
        this._updateIssueClipPaths();
        this._updateIssueLabels();
        this._updateTodayLine();
        this.props.dispatchLoadingStop();
    }

    /**
     * update the dimentions of the background
     * @private
     */
    _updateBackground() {
        this._background()
            .attr('height', this._svg_h())
            .attr('width','100%')
    }

    /**
     * update the x and y positions of the line to reflect the current time and date
     * @private
     */
    _updateTodayLine() {
        var today = moment.utc().valueOf();
        var x1 = this._x1()(today);
        var x2 = this._x1()(today);
        if (this.props.chart.issues.length  == 0){
            x1 = -10;
            x2 = -10;
        }
        this._todayLine()
            .attr("x1", x1)  //<<== change your code here
            .attr("y1", -100)
            .attr("x2", x2)  //<<== and here
            .attr("y2", this._chart_h() + 200);
    }

    /**
     * update the x, y position, width, and labels of each quarter
     * as well as adding and removing quarters
     * @private
     */
    _updateQuarters() {
        var quarterRects = this._quarterRects().selectAll('rect')
            .data(this.props.chart.quarters, d => d.start + '' + d.end)
            .attr('x', (d) =>  this._x1()(d.start))
            .attr('width', d => this._x1()(d.end) - this._x1()(d.start));

        quarterRects.enter().append('rect')
            .attr('class', "quarterRect")
            .attr('x', (d) => {
                return this._x1()(d.start)
            })
            .attr('y', 0)
            .attr('width', d => this._x1()(d.end) - this._x1()(d.start))
            .attr('height', this.quarter_height);
        quarterRects.exit().remove();

        var quarterLabels = this._quarterLabels().selectAll('text')
            .data(this.props.chart.quarters, d => d.start + '' + d.end)
            .attr('x', (d) => (this._x1()(d.start) + this._x1()(d.end))/2);

        quarterLabels.enter().append('text')
            .text(d => {
                let year = moment.utc(d.end).year();
                return 'Q' + d.quarter_num + '  ' + year;
            })
            .attr('class', 'quarterText')
            .attr('x', (d) => (this._x1()(d.start) + this._x1()(d.end))/2)
            .attr('y', (d) => this.quarter_height)
            .attr('dy', -7)
            .attr("text-anchor", "middle");
        quarterLabels.exit().remove();
    }

    /**
     * update the x, y position, and the dates of the axis labels
     * @private
     */
    _updateAxis() {
        var axisLabels = this._axisLabels().selectAll('text')
            .data(this.props.chart.sprints, d => d.start + '' + d.end)
            .attr('x', d => (this._x1()(d.start)));

        axisLabels.enter().append('text')
            .text(d => Utils.getDate(d.start))
            .attr('class','sprintText')
            .attr('x', d => this._x1()(d.start))
            .attr('y', 0)
            .attr('text-anchor', 'middle');
        axisLabels.exit().remove();
    }


    /**
     * update the x, y positions, width and labels of each sprint
     * as well as adding and removing sprints
     * @private
     */
    _updateSprints() {
        var sprintRects = this._sprintRects().selectAll('rect')
            .data(this.props.chart.sprints, d => d.start + '' + d.end)
            .attr('x', (d) =>  this._x1()(d.start))
            .attr('width', d => this._x1()(d.end) - this._x1()(d.start));

        sprintRects.enter().append('rect')
            .attr('class', "sprintRect")
            .attr('x', (d) => {
                return this._x1()(d.start)
            })
            .attr('y', 0)
            .attr('width', d => this._x1()(d.end) - this._x1()(d.start))
            .attr('height', this.sprint_height);
        sprintRects.exit().remove();

        var sprintLabels = this._sprintLabels().selectAll('text')
            .data(this.props.chart.sprints, d => d.start + '' + d.end)
            .attr('x', (d) => (this._x1()(d.start) + this._x1()(d.end))/2);

        sprintLabels.enter().append('text')
            .text(d => 'T'+d.sprint_num)
            .attr('class', 'sprintText')
            .attr('x', (d) => (this._x1()(d.start)+ this._x1()(d.end))/2)
            .attr('y', (d) => this._y1()(0) + this.sprint_height)
            .attr('dy', -6)
            .attr("text-anchor", "middle");
        sprintLabels.exit().remove();
    }


    /**
     * update the x, y positions, colors, widths, of each issue rectangle
     * as well as adding and removing issues
     * @private
     */
    _updateIssueRects() {
        this._issues()
            .attr("width", this._w() )
            .attr("height", this._chart_h() );

        var rects = this._issueRects().selectAll("rect")
            .data(this.props.chart.issues, (d) => d.name)
            .attr("x", (d) => this._x1()(d.start))
            .attr("y", (d) => this._y1()(d.lane) + 10)
            .attr("width", (d) => this._x1()(d.end) - this._x1()(d.start))
            .attr("height", (d) => .8 * this._y1()(1))
            .attr('id', d => 'rect-' + d.id)
            .style('fill', (d) => {
                return Utils.getColors(d).backgroundColor
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
            .on('click', (d) => {Utils.openIssueInNewTab(d.id)});

        rects.enter().append("rect")
            .attr("x", (d) => this._x1()(d.start))
            .attr("y", (d) => this._y1()(d.lane) + 10)
            .attr("width", (d) => this._x1()(d.end) - this._x1()(d.start))
            .attr("height", (d) => .8 * this._y1()(1))
            .attr('id', d => 'rect-' + d.id)
            .style('fill', (d) => {
                return Utils.getColors(d).backgroundColor
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
            .on('click', (d) => {Utils.openIssueInNewTab(d.id)});

        rects.exit().remove();
    }

    /**
     * update the x, y positions, colors, widths, text of each issue label
     * as well as adding and removing labels
     * @private
     */
    _updateIssueLabels() {

        //update the item labels
        var labels = this._issueLabels().selectAll("text")
            .data(this.props.chart.issues, (d) => d.id)
            .text( (d) => d.name)
            .attr("x", (d) => this._x1()(Math.max(d.start, this.props.chart.timeBegin) + 2))
            .attr("y", (d) => this._y1()(d.lane + .5))
            .attr('dx', 5)
            .attr('dy', 7)
            .attr("text-anchor", "start")
            .attr("clip-path", d => ("url(#" + d.id + ")"))
            .style('fill', (d) => {
                return Utils.getColors(d).color
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
            .on('click', (d) => {Utils.openIssueInNewTab(did)});

        labels.enter().append("text")
            .text( (d) => d.name)
            .attr("x", (d) => this._x1()(Math.max(d.start, this.props.chart.timeBegin) + 2))
            .attr("y", (d) => this._y1()(d.lane + .5))
            .attr('dx', 5)
            .attr('dy', 7)
            .attr("text-anchor", "start")
            .attr("clip-path", d => ("url(#" + d.id + ")"))
            .style('fill', (d) => {
                return Utils.getColors(d).color
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
            .on('click', (d) => {Utils.openIssueInNewTab(d.id)});

        labels.exit().remove();
    }


    /**
     * update the x, y positions, widths of each clipPath
     * as well as adding and removing clip paths. We need these clip paths
     * to keep the text for each issue confined within their rectangle
     * @private
     */
    _updateIssueClipPaths() {
        var clippaths = this._issueRects().selectAll('clipPath')
            .data(this.props.chart.issues, d => d.name);

        clippaths
            .append('rect')
            .attr("x", (d) => this._x1()(Math.max(d.start, this.props.chart.timeBegin)))
            .attr("y", (d) => this._y1()(d.lane))
            .attr('width', (d) =>
            this._x1()(Math.min(d.end, this.props.chart.timeEnd )) -
            this._x1()(Math.max(d.start, this.props.chart.timeBegin)) - 5)
            .attr("height", (d) => .8 * this._y1()(1));

        clippaths.enter().append('clipPath')
            .attr( 'id', d => d.id)
            .append('rect')
            .attr("x", (d) => this._x1()(Math.max(d.start, this.props.chart.timeBegin)))
            .attr("y", (d) => this._y1()(d.lane))
            .attr('width', (d) =>
            this._x1()(Math.min(d.end, this.props.chart.timeEnd )) -
            this._x1()(Math.max(d.start, this.props.chart.timeBegin)))
            .attr("height", (d) => .8 * this._y1()(1));

        clippaths.exit().remove();
    }


    render() {

        return(
            <div id="mainChart" style={{width: '100%'}}>
                <svg id="svg"></svg>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        chart: state.chart
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchHoverOnIssue: (id) => {
            dispatch( actionHoverOnIssue(id))
        },
        dispatchLoadingStop: () => {
            dispatch( actionLoadingStop())
        }
    }
};

const Chart = connect (
    mapStateToProps,
    mapDispatchToProps
)(_Chart);

export default Chart

