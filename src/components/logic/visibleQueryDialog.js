/**
 * Created by perandre on 25.07.16.
 */

import React from 'react';
import {connect} from 'react-redux';
import QueryDialog from '../presentation/queryDialog';
import {actionOpenQueryDialog, actionCloseQueryDialog,
    actionSetQueryName} from '../../actions/queryDialog';
import {actionTempQuery} from '../../actions/query';

const mapStateToProps = (state) => {
    return {
        queryDialog: state.queryDialog.open,
        query_temp : state.query.query_temp.query,
        query: state.query.query.query,
        name: state.queryDialog.name,
        start_time: state.brush.start_time,
        end_time: state.brush.end_time,
        is_edit: state.queryDialog.is_edit,
        edit_json: state.queryDialog.edit_json
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchOpenQueryDialog() {
            dispatch(actionOpenQueryDialog())
        },
        dispatchCloseQueryDialog() {
            dispatch(actionCloseQueryDialog())
        },
        dispatchTempQuery(temp_query) {
            dispatch(actionTempQuery(temp_query))
        },
        dispatchSetQueryName(name) {
            dispatch(actionSetQueryName(name))
        }
    }
};

const VisibleQueryDialog = connect (
    mapStateToProps,
    mapDispatchToProps
)(QueryDialog);

export default VisibleQueryDialog