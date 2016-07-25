/**
 * Created by perandre on 25.07.16.
 */

import React from 'react';
import {connect} from 'react-redux';
import QueryDialog from '../presentation/queryDialog';
import {actionOpenQueryDialog, actionCloseQueryDialog} from '../../actions/queryDialog'

const mapStateToProps = (state) => {
    return {
        queryDialog: state.queryDialog.open
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchOpenQueryDialog() {
            dispatch(actionOpenQueryDialog())
        },
        dispatchCloseQueryDialog() {
            dispatch(actionCloseQueryDialog())
        }
    }
};

const VisibleQueryDialog = connect (
    mapStateToProps,
    mapDispatchToProps
)(QueryDialog);

export default VisibleQueryDialog