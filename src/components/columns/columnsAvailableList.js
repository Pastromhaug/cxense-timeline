/**
 * Created by perandre on 05.08.16.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import ColumnsList from './columnsList';
import {COLUMNS} from '../../constants/columnConstants';
import {actionAddGroup} from '../../actions/columns';

/**
 * List of column on the left side of the content in the '/columns' route.
 * Contains columns that aren't currently selected for display in the table on the
 * '/timelines/:query' route.
 */

class _ColumnsAvailableList extends Component {

    render() {

        // filtering out the columns that are already selected for display, and are still available.
        var available_cols = COLUMNS.filter( (col) => this.props.columns_temp.indexOf(col.name) == -1)
            .map( (col) => col.name);

        return (
            <ColumnsList columnNamesToDisplay={available_cols}
                         toAddOrRemove={this.props.to_add}
                         onCellClick={this.props.dispatchAddGroup}/>
        )
    }
}


function mapStateToProps(state) {
    return {
        columns_temp: state.columns.columns_temp,
        to_add: state.columns.to_add
    }
}
function mapDispatchToProps(dispatch) {
    return {
        dispatchAddGroup: (col_name) => {
            dispatch(actionAddGroup(col_name));
        }
    }
}
const ColumnsAvailableList = connect (
    mapStateToProps,
    mapDispatchToProps
)(_ColumnsAvailableList);

export default ColumnsAvailableList;