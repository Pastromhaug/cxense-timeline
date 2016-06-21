/**
 * Created by perandre on 6/21/16.
 */

import React from 'react';
import ReactDOM from 'react-dom'
var d3 = require('d3');
require('../../styles/chartStyles.css');

class MiniChart extends React.Component {

    constructor() {
        super();
        this._createChartStructure.bind(this);
    }

    _createChartStructure() {
        return null;
    }

    render() {
        return (
            <div id="miniChart" style={{width:'100%'}}></div>
        )
    }
}

export default MiniChart;