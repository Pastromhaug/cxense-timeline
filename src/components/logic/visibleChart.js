import React from 'react';
import { connect } from 'react-redux';
import Chart from '../presentation/chart';
import {actionAddIssues, actionBrushInterval} from '../../actions/issues';

const mapStateToProps = (state) => {
    return {
        issues: state.issues,
        brush_start: state.brush.start_time,
        brush_end: state.brush.end_time
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchAddIssues: (issues) => {
        dispatch( actionAddIssues(issues) )
    },

        dispatchBrushInterval: (start_time, end_time) => {
        dispatch( actionBrushInterval(start_time, end_time) )
    }
}
};

const VisibleChart = connect (
    mapStateToProps,
    mapDispatchToProps
)(Chart);

export default VisibleChart
