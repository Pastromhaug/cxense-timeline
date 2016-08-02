/**
 * Created by perandre on 02.08.16.
 */

import React from 'react';
import SetIssuesSprintsQuarters from '../presentation/setIssuesSprintsQuarters';
import {connect} from 'react-redux';

import {actionNewIntervals} from '../../actions/timeIntervals';
import {actionReplaceIssues} from '../../actions/issues';
import {actionApplyQuery, actionTempQuery} from '../../actions/query';

function mapStateToProps(state) {
    return {
        query: state.query.query.query
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchReplaceIssues: (issues) => {
            dispatch( actionReplaceIssues(issues) )
        },
        dispatchNewIntervals: (sprints, quarters) => (
            dispatch(actionNewIntervals(sprints, quarters))
        ),
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