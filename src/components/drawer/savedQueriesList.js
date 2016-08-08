/**
 * Created by perandre on 05.08.16.
 */

import React, {Component} from 'react';
import FIREBASE from '../../constants/firebase';
import SaveQueryButton from './saveQueryButton';
import SavedQueriesListItem from './savedQueriesListItem';
var _ = require('lodash');

import { connect } from 'react-redux';
import {actionSetSavedQueries} from '../../actions/queryDialog';


/**
 * Ths list of saved queries in the left drawer, as well as the 'SAVE QUERY' button
 * right below the list
 */

class _SavedQueriesList extends Component {

    constructor() {
        super();
        this.queriesRef = FIREBASE.database().ref('queries/');
        this.queriesListener = null;
    }

    componentDidMount() {
        // gets the saved queries from firebase.
        // listens for changes on firebase, and updates the redux state when they change.
        this.queriesListener = this.queriesRef.on('value', (data) => {
            const ordered_saved_queries = _.values(data.val()).sort( (a,b) => {
                return a.created_at > b.created_at
            });
            this.props.dispatchSetSavedQueries(ordered_saved_queries)
        });
    }

    componentWillUnmount() {
        this.queriesListener.off();
    }

    render() {
        return (
            <div>
                {/*A SavedQueriesListItem for every saved query in the redux store*/}
                {this.props.saved_queries.map(
                    saved_query => {
                        return <SavedQueriesListItem key={saved_query.key}
                                                     saved_query = {saved_query} />})}
                <SaveQueryButton query={this.props.query}/>
            </div>
        )
    }
}

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

const SavedQueriesList = connect (
    mapStateToProps,
    mapDispatchToProps
)(_SavedQueriesList);

export default SavedQueriesList;



