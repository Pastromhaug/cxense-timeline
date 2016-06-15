/**
 * Created by perandre on 6/14/16.
 */

import React from 'react';
import { connect } from 'react-redux';
import Columns from '../presentation/columns'
import {actionAddAllColumns, actionAddColumn,
        actionRemoveAllColumns, actionRemoveColumn} from '../../actions/columnsTemp';

const mapStateToProps = (state) => {
    return {
        columns_temp: state.columns_temp
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchAddAllColumns: () => {
            dispatch(actionAddAllColumns())
        },

        dispatchAddColumn: (col_name) => {
            dispatch(actionAddColumn(col_name));
        },

        dispatchRemoveColumn: (col_name) => {
            dispatch(actionRemoveColumn(col_name));
        },

        dispatchRemoveAllColumns: () => {
            dispatch(actionRemoveAllColumns());
        }
    }
};

const VisibleColumns = connect (
    mapStateToProps,
    mapDispatchToProps
)(Columns);

export default VisibleColumns