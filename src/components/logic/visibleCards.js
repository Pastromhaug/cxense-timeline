/**
 * Created by perandre on 6/23/16.
 */

import React from 'react';
import { connect } from 'react-redux';
import Cards from '../presentation/cards'
import {actionNewIntervals} from '../../actions/timeIntervals';
import {actionApplyQuery, actionTempQuery} from '../../actions/query';
import {actionOpenQueryDialog, actionCloseQueryDialog} from '../../actions/queryDialog'

const mapStateToProps = (state) => {
    return {
        query: state.query.query.query,
        issues: state.issues
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchNewIntervals: (sprints, quarters) => (
            dispatch(actionNewIntervals(sprints, quarters))
        ),
        dispatchApplyQuery: () => {
            dispatch(actionApplyQuery())
        },
        dispatchTempQuery: (query) => {
            dispatch(actionTempQuery(query))
        },
        dispatchOpenQueryDialog: () => {
            dispatch(actionOpenQueryDialog())
        },
        dispatchCloseQueryDialog: () => {
            dispatch(actionCloseQueryDialog())
        }
    }
};

const VisibleCards = connect (
    mapStateToProps,
    mapDispatchToProps
)(Cards);

export default VisibleCards
