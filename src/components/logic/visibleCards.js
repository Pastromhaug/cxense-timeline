/**
 * Created by perandre on 02.08.16.
 */

import React from 'react'
import Cards from '../presentation/cards';
import {connect} from 'react-redux';
import {actionApplyQuery, actionTempQuery} from '../../actions/query';

function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchApplyQuery: () => {
            dispatch(actionApplyQuery())
        },
        dispatchTempQuery: (query) => {
            dispatch(actionTempQuery(query))
        }
    }
}

const VisibleCards = connect(
    mapStateToProps,
    mapDispatchToProps
)(Cards);

export default VisibleCards