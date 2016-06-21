/**
 * Created by perandre on 6/21/16.
 */

import React from 'react';
import { connect } from 'react-redux';
import Cards from '../presentation/cards';
import {actionAddIssues} from '../../actions/issues';

const mapStateToProps = (state) => {
    return {
        query: state.query.query.query
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchAddIssues: (issues) => {
            dispatch( actionAddIssues(issues) )
        }
    }
};

const VisibleCards = connect(
    mapStateToProps,
    mapDispatchToProps
)(Cards);

export default VisibleCards