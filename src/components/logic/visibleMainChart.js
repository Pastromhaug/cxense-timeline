import React from 'react';
import { connect } from 'react-redux';
import MainChart from '../presentation/mainChart';
import {actionHoverOnIssue} from '../../actions/table';

const mapStateToProps = (state) => {
    return {
        chart: state.chart
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchHoverOnIssue: (id) => {
            dispatch( actionHoverOnIssue(id))
        }
    }
};

const VisibleMainChart = connect (
    mapStateToProps,
    mapDispatchToProps
)(MainChart);

export default VisibleMainChart
