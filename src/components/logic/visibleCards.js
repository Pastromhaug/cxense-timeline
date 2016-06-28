/**
 * Created by perandre on 6/23/16.
 */

import React from 'react';
import { connect } from 'react-redux';
import Cards from '../presentation/cards'
import {actionNewIntervals} from '../../actions/timeIntervals';

const mapStateToProps = (state) => {
    return {
        query: state.query.query.query,
        issues: state.issues
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchNewIntervals: (sprints, quarters) => (
            dispatch(actionNewIntervals(sprints, quarters))
        )
    }
};

const VisibleCards = connect (
    mapStateToProps,
    mapDispatchToProps
)(Cards);

export default VisibleCards
