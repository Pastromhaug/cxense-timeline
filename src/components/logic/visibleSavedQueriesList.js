/**
 * Created by perandre on 05.08.16.
 */

import React from 'react';
import { connect } from 'react-redux';
import SavedQueriesList from '../presentation/savedQueriesList';
import {actionSetSavedQueries} from '../../actions/queryDialog';

const mapStateToProps = (state) => {
    return {
        query: state.query.query.query,
        queryDialog: state.queryDialog.open,
        saved_queries: state.queryDialog.saved_queries
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        
        dispatchSetSavedQueries(saved_queries) {
            dispatch(actionSetSavedQueries(saved_queries))
        }
    }
};

const VisibleSavedQueriesList = connect (
    mapStateToProps,
    mapDispatchToProps
)(SavedQueriesList);

export default VisibleSavedQueriesList;