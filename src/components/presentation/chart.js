/**
 * Created by perandre on 6/9/16.
 */

import React from 'react';
var d3 = require('d3');
var $ = require('jquery');
require('../../styles/chartStyles.css');


var lanes = ["Chinese","Japanese","Korean"],
    laneLength = lanes.length,
    items = [{"lane": 0, "id": "Qin", "start": 5, "end": 205},
        {"lane": 0, "id": "Jin", "start": 265, "end": 420},
        {"lane": 0, "id": "Sui", "start": 580, "end": 615},
        {"lane": 0, "id": "Tang", "start": 620, "end": 900},
        {"lane": 0, "id": "Song", "start": 960, "end": 1265},
        {"lane": 0, "id": "Yuan", "start": 1270, "end": 1365},
        {"lane": 0, "id": "Ming", "start": 1370, "end": 1640},
        {"lane": 0, "id": "Qing", "start": 1645, "end": 1910},
        {"lane": 1, "id": "Yamato", "start": 300, "end": 530},
        {"lane": 1, "id": "Asuka", "start": 550, "end": 700},
        {"lane": 1, "id": "Nara", "start": 710, "end": 790},
        {"lane": 1, "id": "Heian", "start": 800, "end": 1180},
        {"lane": 1, "id": "Kamakura", "start": 1190, "end": 1330},
        {"lane": 1, "id": "Muromachi", "start": 1340, "end": 1560},
        {"lane": 1, "id": "Edo", "start": 1610, "end": 1860},
        {"lane": 1, "id": "Meiji", "start": 1870, "end": 1900},
        {"lane": 1, "id": "Taisho", "start": 1910, "end": 1920},
        {"lane": 1, "id": "Showa", "start": 1925, "end": 1985},
        {"lane": 1, "id": "Heisei", "start": 1990, "end": 1995},
        {"lane": 2, "id": "Three Kingdoms", "start": 10, "end": 670},
        {"lane": 2, "id": "North and South States", "start": 690, "end": 900},
        {"lane": 2, "id": "Goryeo", "start": 920, "end": 1380},
        {"lane": 2, "id": "Joseon", "start": 1390, "end": 1890},
        {"lane": 2, "id": "Korean Empire", "start": 1900, "end": 1945}];
var timeBegin = 0;
var timeEnd = 2000;

class Chart extends React.Component {
    constructor() {
        super();
        //fetch('http://localhost:8001/test').then((data) => {
        //    console.log(data);
        //});
        //$.ajax({
        //    url: 'https://jira.cxense.com/rest/api/2/issue/CXOPS-732',
        //    dataType: 'jsonp',
        //    jsonp: 'jsonp-callback',
        //    success: (data) => console.log(data)
        //});

    }

    componentDidMount() {
        var m = [20, 15, 15, 20], //top right bottom left
            chartWidth = document.getElementById('chart').offsetWidth,
            w = chartWidth - m[1] - m[3],
            h = 500 - m[0] - m[2],
            miniHeight = laneLength * 12 + 50,
            mainHeight = h - miniHeight - 50;

        //scales
        var x = d3.scale.linear()
            .domain([timeBegin, timeEnd])
            .range([0, w]);
        var x1 = d3.scale.linear()
            .range([0, w]);
        var y1 = d3.scale.linear()
            .domain([0, laneLength])
            .range([0, mainHeight]);
        var y2 = d3.scale.linear()
            .domain([0, laneLength])
            .range([0, miniHeight]);

        var chart = d3.select("#svg")
            .attr("width", w + m[1] + m[3])
            .attr("height", h + m[0] + m[2])
            .attr("class", "chart");

        chart.append("defs").append("clipPath")
            .attr("id", "clip")
            .append("rect")
            .attr("width", w)
            .attr("height", mainHeight);

        var main = chart.append("g")
            .attr("transform", "translate(" + m[3] + "," + m[0] + ")")
            .attr("width", w)
            .attr("height", mainHeight)
            .attr("class", "main");

        var mini = chart.append("g")
            .attr("transform", "translate(" + m[3] + "," + (mainHeight + m[0]) + ")")
            .attr("width", w)
            .attr("height", miniHeight)
            .attr("class", "mini");

        var itemRects = main.append("g")
            .attr("clip-path", "url(#clip)");

        //mini item rects
        mini.append("g").selectAll("miniItems")
            .data(items)
            .enter().append("rect")
            .attr("class", function (d) {
                return "miniItem" + d.lane;
            })
            .attr("x", function (d) {
                return x(d.start);
            })
            .attr("y", function (d) {
                return y2(d.lane + .5) - 5;
            })
            .attr("width", function (d) {
                return x(d.end - d.start);
            })
            .attr("height", 10);

        //mini labels
        mini.append("g").selectAll(".miniLabels")
            .data(items)
            .enter().append("text")
            .text(function (d) {
                return d.id;
            })
            .attr("x", function (d) {
                return x(d.start);
            })
            .attr("y", function (d) {
                return y2(d.lane + .5);
            })
            .attr("dy", ".5ex");

        //brush
        var brush = d3.svg.brush()
            .x(x)
            .on("brush", display);

        mini.append("g")
            .attr("class", "x brush")
            .call(brush)
            .selectAll("rect")
            .attr("y", 1)
            .attr("height", miniHeight - 1);

        //display();

        function display() {
            var rects, labels,
                minExtent = brush.extent()[0],
                maxExtent = brush.extent()[1],
                visItems = items.filter(function (d) {
                    return d.start < maxExtent && d.end > minExtent;
                });

            mini.select(".brush")
                .call(brush.extent([minExtent, maxExtent]));

            x1.domain([minExtent, maxExtent]);

            //update main item rects
            rects = itemRects.selectAll("rect")
                .data(visItems, function (d) {
                    return d.id;
                })
                .attr("x", function (d) {
                    return x1(d.start);
                })
                .attr("width", function (d) {
                    return x1(d.end) - x1(d.start);
                });

            rects.enter().append("rect")
                .attr("class", function (d) {
                    return "miniItem" + d.lane;
                })
                .attr("x", function (d) {
                    return x1(d.start);
                })
                .attr("y", function (d) {
                    return y1(d.lane) + 10;
                })
                .attr("width", function (d) {
                    return x1(d.end) - x1(d.start);
                })
                .attr("height", function (d) {
                    return .8 * y1(1);
                });

            rects.exit().remove();

            //update the item labels
            labels = itemRects.selectAll("text")
                .data(visItems, function (d) {
                    return d.id;
                })
                .attr("x", function (d) {
                    return x1(Math.max(d.start, minExtent) + 2);
                });

            labels.enter().append("text")
                .text(function (d) {
                    return d.id;
                })
                .attr("x", function (d) {
                    return x1(Math.max(d.start, minExtent));
                })
                .attr("y", function (d) {
                    return y1(d.lane + .5);
                })
                .attr("text-anchor", "start");

            labels.exit().remove();

        }
    }

    render() {
        return(
            <div id="chart" style={{width:'100%'}}>
                <svg id="svg" > </svg>
            </div>
        )
    }
}

export default Chart