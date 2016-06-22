/**
 * Created by perandre on 6/22/16.
 */

import React from 'react';
var d3 = require('d3');

class MainAxis extends React.Component {

    constructor() {
        super();
        this._w.bind(this);
        this._x1.bind(this);
        this.chartWidth = 0;
        this.h = 20;
    }

    _w() { return  Math.max(this.chartWidth,0) }
    _x1() { return (
        d3.scale.linear()
            .domain( [this.props.brush_start, this.props.brush_end])
            .range( [0, this._w() ] ) )}
    static _svg() { return  d3.select('#axisSvg') }
    static _sprintRects() { return d3.select('#sprintRects') }
    static _sprintLabels() { return d3.select('#sprintLabels') }
    static _yearRects() { return d3.select('#yearRects') }
    static _yearLabels() { return d3.select('#yearLabels')}




    render() {
        return (
            <div id="mainAxis">
                <svg id="axisSvg">
                    <g id="sprintRects"/>
                    <g id="sprintLabels"/>
                    <g id="yearRects"/>
                    <g id="yearLabels"/>
                </svg>
            </div>
        )
    }
}

export default MainAxis;