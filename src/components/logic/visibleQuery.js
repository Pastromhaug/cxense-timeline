/**
 * Created by perandre on 6/14/16.
 */

import React from 'react';
import { connect } from 'react-redux';
import Query from '../presentation/query';
import {actionTempEndDay, actionTempStartDay,
    actionTempFixedOrRelative, actionTempQuery,
    actionApplyQuery} from '../../actions/query';

const mapStateToProps = (state) => {
    return {
        query_temp : state.query.query_temp.query,
        start_day : state.query.query_temp.start_day,
        end_day : state.query.query_temp.end_day
    }
};

const mapDispatchToPRops = (dispatch) => {
    return {
        dispatchTempFixedOrRelative (is_fixed) {
            dispatch(actionTempFixedOrRelative(is_fixed))
        },

        dispatchTempStartDay(start_day) {
            dispatch(actionTempStartDay(start_day))
        },

        dispatchTempEndDay(end_day) {
            dispatch(actionTempEndDay(end_day))
        },

        dispatchTempQuery(temp_query) {
            dispatch(actionTempQuery(temp_query))
        },

        dispatchApplyQuery() {
            dispatch(actionApplyQuery())
        }
    }
};

const VisibleQuery = connect (
    mapStateToProps,
    mapDispatchToPRops
)(Query);

export default VisibleQuery