/**
 * Created by perandre on 04.08.16.
 */

import React, {Component} from 'react';
import {ProgressBar} from 'react-mdl/lib'
import '../../../node_modules/react-mdl/extra/material.js';
import '../../../node_modules/react-mdl/extra/material.css';
import {connect} from 'react-redux';


/**
 * This component contains the thin loading animation that sits right between the grey title
 * and the svg. It only displays between the user clicking on a saved query and the chart updating
 * as it receives new props.
 */
class _Loader extends Component {
    render() {

        var content = <div><ProgressBar indeterminate style={{width:'100%'}}/></div>;
        var style= {height: '4px'};
        if (!this.props.loading) {
            if (this.props.issues.length == 0){
                style={height: '200px'};
                content = <h2 style={{color:'lightgrey', height:'200px', marginTop:'200px'}}>no issues to display</h2>
            } else {
                content = <div/>
            }
        }
        return (
            <div style={style}>{content}</div>
        )
    }
}

function mapStateToProps(state) {
    return {
        loading: state.loading,
        issues: state.chart.issues
    }
}

const Loader = connect(
    mapStateToProps
)(_Loader);

export default Loader;