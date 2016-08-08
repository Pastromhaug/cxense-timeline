/**
 * Created by perandre on 05.08.16.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import FIREBASE from '../../constants/firebase';

import {actionApplyColumns, actionAddColumnsCustom} from '../../actions/columns';

/**
 * this controller does not display anything to the DOM.
 * It's only purpose is to have a firebase listener on the columns, and to update the redux state
 * whenever they change.
 *
 * The columns in firebase only change when someone clicks on the 'SET AS DEFAULT' button on the
 * columns page of the app. If the user just clicks 'APPLY', then the columns get updated in redux
 * but the firebase isn't changed
 */

class _ColumnsStateController extends Component {
    render() {
        return <div></div>
    }
    constructor() {
        super();
        this.columnsRef = FIREBASE.database().ref('columns/');
    }

    componentDidMount() {
        // Whenever the columns change on firebase, update the redux state with those same columns
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


const ColumnsStateController = connect (
    mapStateToProps,
    mapDispatcToProps
)(_ColumnsStateController);

export default ColumnsStateController;