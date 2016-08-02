/**
 * Created by perandre on 6/14/16.
 */

import React from 'react';
import { connect } from 'react-redux';
import Query from '../presentation/query';
import {actionTempEndDay, actionTempStartDay,
    actionTempFixedOrRelative, actionTempQuery,
    actionApplyQuery, actionCancelQuery} from '../../actions/query';

const mapStateToProps = (state) => {
    return {
        query_temp : state.query.query_temp.query,
        start_day : state.query.query_temp.start_day,
        end_day : state.query.query_temp.end_day
    }
};

const mapDispatchToPRops = (dispatch) => {
    return {
        dispatchTempQuery(temp_query) {
            dispatch(actionTempQuery(temp_query))
        },

        dispatchApplyQuery() {
            dispatch(actionApplyQuery())
        },

        dispatchCancelQuery() {
            dispatch(actionCancelQuery())
        }
    }
};

const VisibleQuery = connect (
    mapStateToProps,
    mapDispatchToPRops
)(Query);

export default VisibleQuery