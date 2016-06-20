import React from 'react';
import { connect } from 'react-redux';
import Chart from '../presentation/chart';
import {actionAddIssues} from '../../actions/issues';

const mapStateToProps = (state) => {
    return {
        issues: state.issues
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchAddIssues: (issues) => {
            dispatch( actionAddIssues(issues) )
        }
    }
}

const VisibleChart = connect (
    mapStateToProps,
    mapDispatchToProps
)(Chart);

export default VisibleChart
