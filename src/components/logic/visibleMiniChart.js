/**
 * Created by perandre on 6/21/16.
 */
import React from 'react';
import { connect } from 'react-redux';
import MiniChart from '../presentation/miniChart';
import {actionBrushInterval} from '../../actions/issues';

const mapStateToProps = (state) => {
    return {
        issues: state.issues
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchBrushInterval: (start_time, end_time) => {
            dispatch( actionBrushInterval(start_time, end_time) )
        }
    }
};

const VisibleMiniChart = connect(
    mapStateToProps,
    mapDispatchToProps
)(MiniChart);

export default VisibleMiniChart