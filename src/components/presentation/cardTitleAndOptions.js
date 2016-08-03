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

var savesvg = require('save-svg-as-png');

export default class cardTitleAndOptions extends Component {

    constructor() {
        super();
        this._downloadSvgAsXLSX.bind(this);
        this._downloadSvgAsPng.bind(this);
        this._cell.bind(this);
    }

    componentDidUpdate() {
        console.log('cardTitleAndOptions updated');
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
        const issues = this.props.chart.issues;
        const quarters = this.props.chart.quarters;
        const sprints = this.props.chart.sprints;
        var xl = new XL();
        var workbook = xl.createWorkbook();
        var data = [[{t: 's', v: this.props.query}]];
        var sprintCells = [];
        for (let i = 0; i < sprints.length; i++) {
            let sprint = sprints[i];
            let cell = this._cell('T' + sprint.sprint_num, "FFdae6f1", "FF808080", true, true, true);
            console.log('cell:');
            console.log(cell);
            sprintCells = sprintCells.concat([cell]);
        }
        console.log('sprints: ');
        console.log(sprints);
        console.log('sprintCells: ');
        console.log(sprintCells);
        data = data.concat([sprintCells]);
        console.log('data: ');
        console.log(data);
        var sheet = xl.createSheet2(data);
        workbook = xl.addSheetToWorkbook(workbook,'timeline',sheet)
        xl.saveWorkbook(workbook,'timeline');
    }
    
    
    _cell(value='', color=null, textColor=null, rightBorder=false, leftBorder=false, center=false){
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
                    horizontal: 'bottom'
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
        if (center == true) {
            cell.s.alignment = {
                horizontal: 'center'
            }
        }
        return cell;
    }
    
    
}