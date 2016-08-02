/**
 * Created by perandre on 02.08.16.
 */
import React from 'react';
import { connect } from 'react-redux';
import CardTitleAndOptions from '../presentation/cardTitleAndOptions';
import {actionApplyQuery, actionTempQuery} from '../../actions/query';

const mapStateToProps = (state) => {
    return {
        query: state.query.query.query,
        chart: state.chart.issues,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchApplyQuery: () => {
            dispatch(actionApplyQuery())
        },
        dispatchTempQuery: (query) => {
            dispatch(actionTempQuery(query))
        }
    }
};

const VisibleCardTitleAndOptions = connect (
    mapStateToProps,
    mapDispatchToProps
)(CardTitleAndOptions);

export default VisibleCardTitleAndOptions