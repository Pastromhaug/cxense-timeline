/**
 * Created by perandre on 04.08.16.
 */

import React, {Component} from 'react';
const Loading = require('react-loading-animation');

export default class Loader extends Component {
    render() {
        var content = <div style={{margin: '50px'}}><Loading/></div>;
        console.log('this.props.loading');
        console.log(this.props.loading);
        if (!this.props.loading) {
            content = <div/>
        }
        return (
            <div>{content}</div>
        )
    }

}