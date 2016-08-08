/**
 * Created by perandre on 02.08.16.
 */

import React, {Component} from 'react';

import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import XL from '../../js/xl';

import { connect } from 'react-redux';
import {actionApplyQuery, actionTempQuery} from '../../actions/query';

import {cardHeaderStyles} from '../../styles/componentStyles';
import {CardTitle} from 'material-ui/Card';
import Utils from '../../js/utils';

var savesvg = require('save-svg-as-png');
var moment = require('moment');


/**
 *  This component is the grey bar above the chart that shows the query
 *  and the dropdown menu with the export options.
 *
 *  Has the all the functionaity and computation invovled in exporting
 *  to png and exporting to excel.
 */

class _CardTitleAndExports extends Component {

    constructor() {
        super();
        this._downloadSvgAsXLSX.bind(this);
        this._downloadSvgAsPng.bind(this);
        this._generateSprintCells.bind(this);
        this._generateQuarterCells.bind(this);
        this._cell.bind(this);
        this._blankCell.bind(this);
        this._generateAxisCells.bind(this);
        this._generateTitleCells.bind(this);
        this._generateBlankCells.bind(this);
        this._generateIssueCells.bind(this);
        this._findIndexes.bind(this);
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

    /**
     * Downloads the chart svg as a png. Uses a node module 'save-svg-as-png'
     * to do all the work :)
     * @private
     */
    _downloadSvgAsPng() {
        savesvg.saveSvgAsPng(document.getElementById("svg"), "timeline.png");
    }

    /**
     * Downoads the chart svg as an xlsx spreadsheet. All the computation is done
     * on page and using the functions in '../../js/xl.js'
     * @private
     */
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

    /**
     * For all the issues in this.props.chart.issues, create the
     * 2 dimentional array of jsons that represents the rows for those issues
     * in the exported excel document.
     * @private
     */
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

    /**
     *
     * @param start - utc unix milliseconds representing the start of the range
     * @param end - utc unix millisecons representing end of the range
     * @param sprints - The array of the all the sprints
     * @returns {{start_idx: number, end_idx: number}} - the column numbers that the
     * time interval corresponds to on the xlsx spreadsheet for the export
     * @private
     */
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


    /**
     * @returns {Array} of jsons - representing the row above the chart containing the query
     * @private
     */
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

    /**
     * @returns {Array} of jsons - representing a row of blank cells with no grid,
     * so it appears completely white like paper.
     * @private
     */
    _generateBlankCells() {
        var blankCells = [];
        for (let i = 0; i < this.props.chart.sprints.length; i++) {
            let cell = this._blankCell();
            blankCells = blankCells.concat([cell]);
        }
        return blankCells;
    }

    /**
     * @returns {Array} of jsons - row containing the dates of all the sprints to display
     * above the sprints.
     * @private
     */
    _generateAxisCells() {
        var axisCells = [];
        for (let i = 0; i < this.props.chart.sprints.length; i++) {
            let sprint = this.props.chart.sprints[i];
            let cell = this._cell(Utils.getDate(sprint.start), "FFFFFFFF", "FF808080", false,false,false);
            axisCells = axisCells.concat([cell]);
        }
        return axisCells;
    }

    /**
     * @returns {Array} of jsons - the row of the dark blue cells containing the quarters
     * @private
     */
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

            let textCellIdx = Math.floor((end_idx - start_idx)/2 + start_idx);
            for (let j = start_idx; j <= end_idx; j++) {
                let text =  '';
                let leftBorder = false;
                let rightBorder = false;
                if (j == start_idx) leftBorder = true;
                if (j == end_idx) rightBorder = true;
                if (end_idx == start_idx) text = 'Q' + quarter.quarter_num + '  ' + year;
                if (j == textCellIdx) text = 'Q' + quarter.quarter_num + '  ' + year;
                var cell = this._cell(text, backgroundColor, textColor,leftBorder,rightBorder,false);
                quarterCells[j] = cell;
            }
        }
        return quarterCells;
    }

    /**
     *
     * @returns json - representing a blank cell with no outline
     * @private
     */
    _blankCell() {
        return this._cell('', "FFFFFFFF", "FFFFFFFF", false,false,false);
    }


    /**
     *
     * @returns {Array} of jsons - row of the light blue sprints
     * @private
     */
    _generateSprintCells() {
        var sprintCells = [];
        for (let i = 0; i < this.props.chart.sprints.length; i++) {
            let sprint = this.props.chart.sprints[i];
            let cell = this._cell('T' + sprint.sprint_num, "FFdae6f1", "FF808080", true, true, true);
            sprintCells = sprintCells.concat([cell]);
        }
        return sprintCells;
    }

    /**
     *
     * @param value - the text to display in the cel, '' by default
     * @param color - the background color of the cell, white by default
     * @param textColor - the color of the text, black by default
     * @param leftBorder - bool of whether to display a white border on the left side of the cell.
     * false by default
     * @param rightBorder - bool of whether to display a white border on the right side of the cell.
     * false by default
     * @param center - bool of whether to center the text. false by default
     * @param bottomBorder - bool of whether to have white border on the bottom, true by default
     * @returns {{t: string, v: string, s: {fill: {fgColor: {}}, font: {color: {}}, border: {right: {}, left: {}, bottom: {style: string, color: {rgb: string}}}, alignment: {horizontal: string, vertical: string}}}}
     * @private
     */
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


const mapStateToProps = (state) => {
    return {
        query: state.query.query.query,
        chart: state.chart
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchApplyQuery: () => {
            dispatch(actionApplyQuery())
        },
        dispatchTempQuery: (query) => {
            dispatch(actionTempQuery(query))
        }
    }
};

const CardTitleAndExports = connect (
    mapStateToProps,
    mapDispatchToProps
)(_CardTitleAndExports);

export default CardTitleAndExports