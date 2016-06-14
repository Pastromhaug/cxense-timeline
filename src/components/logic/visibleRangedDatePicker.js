/**
 * Created by perandre on 6/14/16.
 */

import React from 'react';
import { connect } from 'react-redux';
import RangedDatePicker from '../presentation/rangedDatePicker';
import {actionTempEndDate, actionTempStartDate} from '../../actions/queryTemp';

const mapStateToProps = (state) => {
    return {
        start_date: state.query_temp.start_date,
        end_date: state.query_temp.end_date
    }
};

const mapDispatchToPRops = (dispatch) => {
    return {
        dispatchTempStartDate: (start_date) => {
            dispatch(actionTempStartDate(start_date))
        },

        dispatchTempEndDate: (end_date) => {
            dispatch(actionTempEndDate(end_date))
        }
    }
};

const VisibleRangeDatePicker = connect (
    mapStateToProps,
    mapDispatchToPRops
)(RangedDatePicker);

export default VisibleRangeDatePicker