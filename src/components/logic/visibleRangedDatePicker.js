/**
 * Created by perandre on 6/14/16.
 */

import React from 'react';
import { connect } from 'react-redux';
import RangedDatePicker from '../presentation/rangedDatePicker';
import {actionChangeTempEndDate, actionChangeTempStartDate} from '../../actions/query';

const mapStateToProps = (state) => {
    return {
        start_date: state.query_temp.start_date,
        end_date: state.query_temp.end_date
    }
};

const mapDispatchToPRops = (dispatch) => {
    return {
        dispatchChangeTempStartDate: (start_date) => {
            dispatch(actionChangeTempStartDate(start_date))
        },

        dispatchChangeTempEndDate: (end_date) => {
            dispatch(actionChangeTempEndDate(end_date))
        }
    }
};

const VisibleRangeDatePicker = connect (
    mapStateToProps,
    mapDispatchToPRops
)(RangedDatePicker);

export default VisibleRangeDatePicker