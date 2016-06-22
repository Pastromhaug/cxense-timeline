/**
 * Created by perandre on 6/22/16.
 */
import React from 'react';
import { connect } from 'react-redux';
import MainAxis from '../presentation/mainAxis';

const mapStateToProps = (state) => {
    return {
        issues: state.issues,
        brush_start: state.brush.start_time,
        brush_end: state.brush.end_time
    }
};

const VisibleMainAxis = connect (
    mapStateToProps
)(MainAxis);

export default VisibleMainAxis
