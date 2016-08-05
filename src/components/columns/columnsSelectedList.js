/**
 * Created by perandre on 05.08.16.
 */


import React, {Component} from 'react';
import ColumnsList from './columnsList';
import { connect } from 'react-redux';
import {actionRemoveGroup} from '../../actions/columns';

class _ColumnsSelectedList extends Component {
    render() {
        return (
            <ColumnsList columnNamesToDisplay={this.props.columns_temp}
                         toAddOrRemove={this.props.to_remove}
                         onCellClick={this.props.dispatchRemoveGroup}/>
        )
    }
}


function mapStateToProps(state) {
    return {
        columns_temp: state.columns.columns_temp,
        to_remove: state.columns.to_remove
    }}
function mapDispatchToProps(dispatch) {
    return {
        dispatchRemoveGroup: (col_name) => {
            dispatch(actionRemoveGroup(col_name));
        }
    }
}
const ColumnsSelectedList = connect (
    mapStateToProps,
    mapDispatchToProps
)(_ColumnsSelectedList);

export default ColumnsSelectedList;

