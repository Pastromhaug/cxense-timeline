/**
 * Created by perandre on 6/14/16.
 */

import React from 'react';
import { connect } from 'react-redux';
import Query from '../presentation/query';
import {actionChangeEndDate, actionChangeStartDate} from '../../actions/query';

const mapStateToProps = (state) => {
    return {
        query: state.query,
        query_temp : state.query_temp
    }
};

const mapDispatchToPRops = (dispatch) => {
    return {
        dispatchChangeStartDate: (start_date) => {
            dispatch(actionChangeStartDate(start_date))
        },

        dispatchChangeEndDate: (end_date) => {
            dispatch(actionChangeEndDate(end_date))
        }
    }
};

const VisibleQuery = connect (
    mapStateToProps,
    mapDispatchToPRops
)(Query);

export default VisibleQuery