/**
 * Created by perandre on 6/21/16.
 */
import React from 'react';
import { connect } from 'react-redux';
import MiniChart from '../presentation/miniChart';

const mapStateToProps = (state) => {
    return {
        state: state
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        state2: null
    }
};

const VisibleMiniChart = connect(
    mapStateToProps,
    mapDispatchToProps
)(MiniChart);

export default VisibleMiniChart