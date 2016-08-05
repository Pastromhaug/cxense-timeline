/**
 * Created by perandre on 05.08.16.
 */

import React from 'react';
import { connect } from 'react-redux';
import SavedQueriesList from '../presentation/savedQueriesList';
import {actionOpenQueryDialog,
    actionSetSavedQueries, actionSetEditJson,
    actionSetEditMode, actionSetQueryName} from '../../actions/queryDialog';
import {actionTempQuery, actionApplyQueryCustom} from '../../actions/query';
import {actionApplyColumns, actionAddColumnsCustom} from '../../actions/columns';
import {actionLoadingStart,actionLoadingStop} from '../../actions/loading';

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
        },
        dispatchLoadingStop() {
            dispatch(actionLoadingStop())
        }
    }
};

const VisibleSavedQueriesList = connect (
    mapStateToProps,
    mapDispatchToProps
)(SavedQueriesList);

export default VisibleSavedQueriesList;