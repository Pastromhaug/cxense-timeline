import React from 'react';
import { connect } from 'react-redux';
import MainChart from '../presentation/mainChart';
import {actionBrushInterval} from '../../actions/issues';

const mapStateToProps = (state) => {
    return {
        issues: state.issues,
        brush_start: state.brush.start_time,
        brush_end: state.brush.end_time
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchBrushInterval: (start_time, end_time) => {
            dispatch( actionBrushInterval(start_time, end_time) )
        }
    }
};

const VisibleMainChart = connect (
    mapStateToProps,
    mapDispatchToProps
)(MainChart);

export default VisibleMainChart
