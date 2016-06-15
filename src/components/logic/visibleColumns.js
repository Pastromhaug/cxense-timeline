/**
 * Created by perandre on 6/14/16.
 */

import React from 'react';
import { connect } from 'react-redux';
import Columns from '../presentation/columns'
import {actionAddAllColumns, actionAddColumns,
        actionRemoveAllColumns, actionRemoveColumns,
        actionAddGroup, actionRemoveGroup} from '../../actions/columnsTemp';

const mapStateToProps = (state) => {
    return {
        columns_temp: state.columns_temp.columns_temp,
        to_add: state.columns_temp.to_add,
        to_remove: state.columns_temp.to_remove
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
        }
    }
};

const VisibleColumns = connect (
    mapStateToProps,
    mapDispatchToProps
)(Columns);

export default VisibleColumns