/**
 * Created by perandre on 02.08.16.
 */

import React from 'react';
import SetIssuesSprintsQuarters from '../presentation/setIssuesSprintsQuarters';
import {connect} from 'react-redux';

import {actionSetAllChartState} from '../../actions/chart';
import {actionApplyQuery, actionTempQuery} from '../../actions/query';

function mapStateToProps(state) {
    return {
        query: state.query.query.query
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchSetAllChartState: (issues, sprints, quarters, timeBegin, timeEnd) => {
            dispatch(actionSetAllChartState(issues, sprints, quarters, timeBegin, timeEnd))
        },
        dispatchApplyQuery: () => {
            dispatch(actionApplyQuery())
        },
        dispatchTempQuery: (query) => {
            dispatch(actionTempQuery(query))
        }
    }
}

const VisibleSetIssuesSprintsQuarters = connect(
    mapStateToProps,
    mapDispatchToProps
)(SetIssuesSprintsQuarters);

export default VisibleSetIssuesSprintsQuarters