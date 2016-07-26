/**
 * Created by perandre on 6/23/16.
 */

import React from 'react';
import { connect } from 'react-redux';
import AppContent from '../presentation/appContent';
import {actionReplaceIssues} from '../../actions/issues';
import {actionOpenQueryDialog, actionCloseQueryDialog,
    actionSetSavedQueries} from '../../actions/queryDialog';
import {actionTempQuery} from '../../actions/query';

const mapStateToProps = (state) => {
    return {
        query: state.query.query.query,
        queryDialog: state.queryDialog.open,
        saved_queries: state.queryDialog.saved_queries
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchReplaceIssues: (issues) => {
            dispatch( actionReplaceIssues(issues) )
        },
        dispatchOpenQueryDialog: () => {
            dispatch(actionOpenQueryDialog())
        },
        dispatchCloseQueryDialog: () => {
            dispatch(actionCloseQueryDialog())
        },
        dispatchTempQuery(temp_query) {
            dispatch(actionTempQuery(temp_query))
        },
        dispatchSetSavedQueries(saved_queries) {
            dispatch(actionSetSavedQueries(saved_queries))
        }
    }
};

const VisibleAppContent = connect (
    mapStateToProps,
    mapDispatchToProps
)(AppContent);

export default VisibleAppContent;