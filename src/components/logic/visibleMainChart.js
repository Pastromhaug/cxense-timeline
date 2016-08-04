import React from 'react';
import { connect } from 'react-redux';
import MainChart from '../presentation/mainChart';
import {actionHoverOnIssue} from '../../actions/table';
import {actionLoadingStop} from '../../actions/loading';

const mapStateToProps = (state) => {
    return {
        chart: state.chart
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchHoverOnIssue: (id) => {
            dispatch( actionHoverOnIssue(id))
        },
        dispatchLoadingStop: () => {
            dispatch( actionLoadingStop())
        }
    }
};

const VisibleMainChart = connect (
    mapStateToProps,
    mapDispatchToProps
)(MainChart);

export default VisibleMainChart
