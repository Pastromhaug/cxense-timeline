/**
 * Created by perandre on 05.08.16.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import FIREBASE from '../../constants/firebase';

import {actionApplyColumns, actionAddColumnsCustom} from '../../actions/columns';

class TableColumnsStateController extends Component {
    render() {
        return <div></div>
    }
    constructor() {
        super();
        this.columnsRef = FIREBASE.database().ref('columns/');
    }

    componentDidMount() {
        this.columnsListener = this.columnsRef.on('value', (data) => {
            this.props.dispatchAddColumnsCustom(data.val());
            this.props.dispatchApplyColumns()
        })
    }

    componentWillUnmount() {
        this.columnsListener.off();
    }
}

function mapStateToProps() {return {}}
function mapDispatcToProps(dispatch) {
    return {
        dispatchApplyColumns: () => {
            dispatch(actionApplyColumns())
        },
        dispatchAddColumnsCustom(columns_list) {
            dispatch(actionAddColumnsCustom(columns_list))
        }
    }
}


const VisibleTableColumnsStateController = connect (
    mapStateToProps,
    mapDispatcToProps
)(TableColumnsStateController);

export default VisibleTableColumnsStateController;