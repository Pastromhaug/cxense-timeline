/**
 * Created by perandre on 6/23/16.
 */

import React from 'react';
import { connect } from 'react-redux';
import AppContent from '../presentation/appContent';
import {actionOpenQueryDialog, actionCloseQueryDialog,
    actionSetSavedQueries, actionSetEditJson,
    actionSetEditMode, actionSetQueryName} from '../../actions/queryDialog';
import {actionTempQuery, actionApplyQueryCustom} from '../../actions/query';
import {actionApplyColumns, actionAddColumnsCustom} from '../../actions/columns';
import {actionLoadingStart} from '../../actions/loading';

const mapStateToProps = (state) => {
    return {
        query: state.query.query.query,
        queryDialog: state.queryDialog.open,
        saved_queries: state.queryDialog.saved_queries
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
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
        },
        dispatchApplyQueryCustom(query) {
            dispatch(actionApplyQueryCustom(query))
        },
        dispatchSetEditJson(edit_json) {
            dispatch(actionSetEditJson(edit_json))
        },
        dispatchSetEditMode(to_edit) {
            dispatch(actionSetEditMode(to_edit))
        },
        dispatchSetQueryName(name) {
            dispatch(actionSetQueryName(name))
        },
        dispatchApplyColumns: () => {
            dispatch(actionApplyColumns())
        },
        dispatchAddColumnsCustom(columns_list) {
            dispatch(actionAddColumnsCustom(columns_list))
        },
        dispatchLoadingStart() {
            dispatch(actionLoadingStart())
        }
    }
};

const VisibleAppContent = connect (
    mapStateToProps,
    mapDispatchToProps
)(AppContent);

export default VisibleAppContent;