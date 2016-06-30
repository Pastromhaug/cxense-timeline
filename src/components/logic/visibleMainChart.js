import React from 'react';
import { connect } from 'react-redux';
import MainChart from '../presentation/mainChart';
import {actionBrushInterval} from '../../actions/issues';
import {actionHoverOnIssue} from '../../actions/table';

const mapStateToProps = (state) => {
    return {
        issues: state.issues,
        sprints: state.timeIntervals.sprints,
        quarters: state.timeIntervals.quarters,
        brush_start: state.brush.start_time,
        brush_end: state.brush.end_time
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchBrushInterval: (start_time, end_time) => {
            dispatch( actionBrushInterval(start_time, end_time) )
        },
        dispatchHoverOnIssue: (id) => {
            dispatch( actionHoverOnIssue(id))
        }
    }
};

const VisibleMainChart = connect (
    mapStateToProps,
    mapDispatchToProps
)(MainChart);

export default VisibleMainChart
