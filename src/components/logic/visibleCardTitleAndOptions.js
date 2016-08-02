/**
 * Created by perandre on 02.08.16.
 */
import React from 'react';
import { connect } from 'react-redux';
import CardTitleWithOptions from '../presentation/cardTitleAndOptions';
import {actionNewIntervals} from '../../actions/timeIntervals';
import {actionApplyQuery, actionTempQuery} from '../../actions/query';

const mapStateToProps = (state) => {
    return {
        query: state.query.query.query,
        issues: state.issues,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchNewIntervals: (sprints, quarters) => (
            dispatch(actionNewIntervals(sprints, quarters))
        ),
        dispatchApplyQuery: () => {
            dispatch(actionApplyQuery())
        },
        dispatchTempQuery: (query) => {
            dispatch(actionTempQuery(query))
        }
    }
};

const VisibleCards = connect (
    mapStateToProps,
    mapDispatchToProps
)(Cards);

export default VisibleCards