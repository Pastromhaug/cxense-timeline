/**
 * Created by perandre on 05.08.16.
 */

import React from 'react';
import { connect } from 'react-redux';
import SavedQueriesListItem from '../presentation/savedQueriesListItem';
import {actionOpenQueryDialog,actionSetEditJson,
    actionSetEditMode, actionSetQueryName} from '../../actions/queryDialog';
import {actionTempQuery, actionApplyQueryCustom} from '../../actions/query';
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
        dispatchLoadingStart() {
            dispatch(actionLoadingStart())
        },
        dispatchLoadingStop() {
            dispatch(actionLoadingStop())
        }
    }
};

const VisibleSavedQueriesListItem = connect (
    mapStateToProps,
    mapDispatchToProps
)(SavedQueriesListItem);

export default VisibleSavedQueriesListItem;