/**
 * Created by perandre on 02.08.16.
 */

import React, {Component} from 'react';

import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import XL from './XL';

import {cardHeaderStyles} from '../../styles/componentStyles';
import {CardTitle} from 'material-ui/Card';
import Utils from './utils';

var savesvg = require('save-svg-as-png');
var moment = require('moment');

export default class cardTitleAndOptions extends Component {

    constructor() {
        super();
        this._downloadSvgAsXLSX.bind(this);
        this._downloadSvgAsPng.bind(this);
        this._generateSprintCells.bind(this);
        this._generateQuarterCells.bind(this);
        this._cell.bind(this);
        this._blankCell.bind(this);
        this._middleQuarterCell.bind(this);
        this._middleQuarterCellText.bind(this);
        this._firstQuarterCell.bind(this);
        this._firstQuarterCellText.bind(this);
        this._lastQuarterCell.bind(this);
        this._lastQuarterCellText.bind(this);
        this._generateAxisCells.bind(this);
        this._generateTitleCells.bind(this);
        this._generateBlankCells.bind(this);
        this._generateIssueCells.bind(this);
        this._findIndexes.bind(this);
        this.msIn2Weeks = 1210000000;
        this.msIn5days =  432000000;
    }

    render() {
        return (
            <div
                style={cardHeaderStyles}>
                <CardTitle style={{padding: '0px', margin: '16px', marginRight: '50px'}}> {this.props.query} </CardTitle>
                <IconMenu
                    iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    style={{marginLeft: 'auto'}}
                >
                    <MenuItem primaryText="download as png"
                              onClick={() => {
                                        this._downloadSvgAsPng()
                                    }}/>
                    <MenuItem primaryText="export to XLSX"
                              onClick={() => {
                                    this._downloadSvgAsXLSX()
                                }}/>
                </IconMenu>
            </div>
        )
    }

    _downloadSvgAsPng() {
        savesvg.saveSvgAsPng(document.getElementById("svg"), "timeline.png");
    }

    
    _downloadSvgAsXLSX() {

        var xl = new XL();
        var workbook = xl.createWorkbook();
        var data = [];

        var axisCells = this._generateAxisCells();
        var quarterCells = this._generateQuarterCells();
        var sprintCells = this._generateSprintCells();
        var issueCells = this._generateIssueCells();

        data = data.concat([this._generateBlankCells()]);
        data = data.concat([this._generateTitleCells()]);
        data = data.concat([this._generateBlankCells()]);
        data = data.concat([axisCells]);
        data = data.concat([quarterCells]);
        data = data.concat([sprintCells]);
        data = data.concat([this._generateBlankCells()]);
        data = data.concat(issueCells);
        data = data.concat([this._generateBlankCells()]);

        var sheet = xl.createSheet2(data);
        workbook = xl.addSheetToWorkbook(workbook,'timeline',sheet);
        xl.saveWorkbook(workbook,'timeline');
    }


    _generateIssueCells() {
        var issueCells = [];
        var lanes = {};
        for (let i = 0; i < this.props.chart.issues.length; i++){
            let issue = this.props.chart.issues[i];
            let issueLane = issue.lane;
            let issueLaneKey = issueLane.toString();
            if (! _.has(lanes, issueLaneKey)) {
                lanes[issueLaneKey] = this._generateBlankCells();
            }
            let currLaneCells = lanes[issueLaneKey];
            // let start_idx = Math.ceil(issue.start/this.msIn2Weeks);
            // let end_idx = Math.ceil(issue.end/this.msIn2Weeks);
            var idxs = this._findIndexes(issue.start, issue.end, this.props.chart.sprints);
            var start_idx = idxs.start_idx;
            var end_idx = idxs.end_idx;

            for (let j = start_idx; j <= end_idx; j++) {
                let colors = Utils.getColors(issue);
                let textColor = 'FF' + colors.color;
                let backgroundColor = 'FF' + colors.backgroundColor;
                let text = '';
                let leftBorder = false;
                let rightBorder = false;
                if (j == start_idx) {
                    leftBorder = true;
                    text = issue.name;
                }
                else if (j == end_idx) {
                    rightBorder = true
                }
                currLaneCells[j] = this._cell(text, backgroundColor, textColor, leftBorder, rightBorder,false);
            }
            lanes[issueLaneKey] = currLaneCells;


        }
        for (let k = 0; k < Object.keys(lanes).length; k++) {
            let currLaneCells = lanes[k.toString()];
            issueCells = issueCells.concat([currLaneCells]);
            // issueCells = issueCells.concat([this._generateBlankCells()])
        }
        return issueCells;
    }

    _findIndexes(start, end, sprints) {
        var i = 0;
        while ((sprints[i].start + this.msIn5days) < start) {
            i++;
        }
        const start_idx = i;
        while((sprints[i].end + this.msIn5days) < end) {
            i++;
        }
        const end_idx = i;
        return {
            start_idx: start_idx,
            end_idx: end_idx
        }
    }



    _generateTitleCells() {
        var titleCells = [];
        for (let i = 0; i < this.props.chart.sprints.length; i++) {
            let cell = this._cell('', "FFFFFFFF", "FF808080", false,false,false);
            if (i == 1) {
                cell = this._cell(this.props.query, "FFFFFFFF", "FF000000", false,false,false);
            }
            titleCells = titleCells.concat([cell]);
        }
        return titleCells;
    }

    _generateBlankCells() {
        var blankCells = [];
        for (let i = 0; i < this.props.chart.sprints.length; i++) {
            let cell = this._blankCell();
            blankCells = blankCells.concat([cell]);
        }
        return blankCells;
    }

    _generateAxisCells() {
        var axisCells = [];
        for (let i = 0; i < this.props.chart.sprints.length; i++) {
            let sprint = this.props.chart.sprints[i];
            let cell = this._cell(Utils.getDate(sprint.start), "FFFFFFFF", "FF808080", false,false,false);
            axisCells = axisCells.concat([cell]);
        }
        return axisCells;
    }

    _generateQuarterCells() {
        var quarterCells = this._generateBlankCells();
        for (let i = 0; i < this.props.chart.quarters.length; i++){
            let quarter = this.props.chart.quarters[i];
            // let sprintsInQuarter = Math.ceil((quarter.end - quarter.start)/this.msIn2Weeks);
            let idxs = this._findIndexes(quarter.start, quarter.end, this.props.chart.sprints);
            let start_idx = idxs.start_idx;
            let end_idx = idxs.end_idx;

            let year = moment.utc(quarter.end).year();

            let backgroundColor = 'FFb5cde3';
            let textColor = 'FF585858';

            let textCellIdx = Math.floor((end_idx - start_idx)/2+1 + start_idx);
            for (let j = start_idx; j <= end_idx; j++) {
                let text =  '';
                let leftBorder = false;
                let rightBorder = false;
                if (j == start_idx) leftBorder = true;
                if (j == end_idx) rightBorder = true;
                if (j == textCellIdx) text = 'Q' + quarter.quarter_num + '  ' + year;
                var cell = this._cell(text, backgroundColor, textColor,leftBorder,rightBorder,false);
                quarterCells[j] = cell;
            }
        }
        return quarterCells;
    }

    _blankCell() {
        return this._cell('', "FFFFFFFF", "FFFFFFFF", false,false,false);
    }
    _lastQuarterCell() {
        return this._cell('', "FFb5cde3", "FF585858",false,true,false);
    }
    _lastQuarterCellText(text) {
        return this._cell(text, "FFb5cde3", "FF585858",false,true,false);
    }
    _firstQuarterCell() {
        return this._cell('', "FFb5cde3", "FF585858",true,false,false);
    }
    _firstQuarterCellText(text) {
        return this._cell(text, "FFb5cde3", "FF585858",true,true,true);
    }
    _middleQuarterCell() {
        return this._cell('', "FFb5cde3", "FF585858", false, false, false);
    }
    _middleQuarterCellText(text) {
        return this._cell(text, "FFb5cde3", "FF585858", false, false, false);
    }


    _generateSprintCells() {
        var sprintCells = [];
        for (let i = 0; i < this.props.chart.sprints.length; i++) {
            let sprint = this.props.chart.sprints[i];
            let cell = this._cell('T' + sprint.sprint_num, "FFdae6f1", "FF808080", true, true, true);
            sprintCells = sprintCells.concat([cell]);
        }
        return sprintCells;
    }
    
    
    _cell(value='', color=null, textColor=null, leftBorder=false, rightBorder=false, center=false, bottomBorder=true){
        var cell = {
            t: 's',
            v: value,
            s: {
                fill: {
                    fgColor: {}
                },
                font: {
                    color: {}
                },
                border: {
                    right: {},
                    left: {},
                    bottom: {
                        style: 'medium',
                        color: {
                            rgb: 'FFFFFFFF'
                        }
                    }
                },
                alignment: {
                    horizontal: 'bottom',
                    vertical: 'center'
                }
            }
        };
        if (color != null) {
            cell.s.fill.patternType = 'solid';
            cell.s.fill.fgColor.rgb = color;
        }
        if (textColor != null) {
            cell.s.font.color.rgb = textColor;
        }
        if (rightBorder == true) {
            cell.s.border.right = {
                style: 'medium',
                color: {
                    rgb: 'FFFFFFFF'
                }
            }
        }
        if (leftBorder == true) {
            cell.s.border.left = {
                style: 'medium',
                color: {
                    rgb: 'FFFFFFFF'
                }
            }
        }
        if(bottomBorder == false) {
            cell.s.border.bottom = {}
        }
        if (center == true) {
            cell.s.alignment = {
                horizontal: 'center'
            }
        }
        return cell;
    }
    
    
}