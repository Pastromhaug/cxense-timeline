/**
 * Created by perandre on 6/14/16.
 */

import React from 'react';
import { connect } from 'react-redux';
import Columns from '../presentation/columns'
import {actionAddAllColumns, actionAddColumns,
        actionRemoveAllColumns, actionRemoveColumns,
        actionAddGroup, actionRemoveGroup, actionApplyColumns} from '../../actions/columns';

const mapStateToProps = (state) => {
    return {
        columns_temp: state.columns.columns_temp,
        to_add: state.columns.to_add,
        to_remove: state.columns.to_remove,
        query: state.query.query.query
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchAddAllColumns: () => {
            dispatch(actionAddAllColumns())
        },

        dispatchAddColumns: () => {
            dispatch(actionAddColumns());
        },

        dispatchRemoveColumns: () => {
            dispatch(actionRemoveColumns());
        },

        dispatchRemoveAllColumns: () => {
            dispatch(actionRemoveAllColumns());
        },

        dispatchAddGroup: (col_name) => {
            dispatch(actionAddGroup(col_name));
        },

        dispatchRemoveGroup: (col_name) => {
            dispatch(actionRemoveGroup(col_name));
        },

        dispatchApplyColumns: () => {
            dispatch(actionApplyColumns())
        }
}
};

const VisibleColumns = connect (
    mapStateToProps,
    mapDispatchToProps
)(Columns);

export default VisibleColumns