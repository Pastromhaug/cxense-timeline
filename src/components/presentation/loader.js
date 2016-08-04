/**
 * Created by perandre on 04.08.16.
 */

import React, {Component} from 'react';
// const Loading = require('react-loading-animation');
import {ProgressBar} from 'react-mdl/lib'
import '../../../node_modules/react-mdl/extra/material.js';
import '../../../node_modules/react-mdl/extra/material.css';

export default class Loader extends Component {
    render() {

        var content = <div><ProgressBar indeterminate style={{width:'100%'}}/></div>;
        console.log('this.props.loading');
        console.log(this.props.loading);
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