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
        console.log('eyy');
        var xl = new XL();
        var workbook = xl.createWorkbook();
        var data = [];

        var sheet = xl.createSheet2(data);
        workbook = xl.addSheetToWorkbook(workbook,'timeline',sheet)
        xl.saveWorkbook(workbook,'timeline');
    }
}