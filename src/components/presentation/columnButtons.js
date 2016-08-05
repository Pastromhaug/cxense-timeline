/**
 * Created by perandre on 05.08.16.
 */

import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {colButton} from '../../styles/componentStyles';
import {Link} from 'react-router';
import FIREBASE from '../../constants/firebase';

import {connect} from 'react-redux';
import {actionAddAllColumns, actionAddColumns,
    actionRemoveAllColumns, actionRemoveColumns,
    actionAddGroup, actionRemoveGroup, actionApplyColumns} from '../../actions/columns';

class _ColumnButtons extends Component {

    _pushColsToFirebase() {
        FIREBASE.database().ref('columns/').set(columns_temp);
    }

    render(){
        return (
            <div style={{ width: '250px', float: 'left', textAlign:'center'}}>
                <RaisedButton style={colButton} label="Add All"
                              onClick={ () => this.props.dispatchAddAllColumns()}/>
                <RaisedButton style={colButton} label="Add"
                              onClick={ () => this.props.dispatchAddColumns()}/>
                <RaisedButton style={colButton} label="Remove"
                              onClick={ () => this.props.dispatchRemoveColumns()}/>
                <RaisedButton style={colButton} label="Remove All"
                              onClick={ () => this.props.dispatchRemoveAllColumns()}/>
                <Link to={"/timeline/" + this.props.query}>
                    <RaisedButton style={colButton} label="Apply"
                                  onClick={ () => this.props.dispatchApplyColumns()}/>
                </Link>

                <Link to={"/timeline/" + this.props.query}>
                    <RaisedButton style={colButton} label="Set As Defaults"
                                  onClick={ () => {
                                  this.props.dispatchApplyColumns();
                                  this._pushColsToFirebase();
                                  }}/>
                </Link>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        query: state.query.query.query
    }
}
function mapDispatchToProps(dispatch) {
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
}
const ColumnButtons = connect (
    mapStateToProps,
    mapDispatchToProps
)(_ColumnButtons);

export default ColumnButtons;