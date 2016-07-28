import React from 'react';
import { connect } from 'react-redux';
import MainChart from '../presentation/mainChart';
import {actionBrushInterval} from '../../actions/issues';
import {actionHoverOnIssue} from '../../actions/table';

const mapStateToProps = (state) => {
    return {
        issues: state.issues,
        sprints: state.timeIntervals.sprints,
        quarters: state.timeIntervals.quarters
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
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
