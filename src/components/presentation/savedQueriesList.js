/**
 * Created by perandre on 05.08.16.
 */

import React, {Component} from 'react';
import FIREBASE from '../../constants/firebase';
import VisibleSaveQueryButton from '../logic/visibleSaveQueryButton';
import SavedQueriesListItem from '../presentation/savedQueriesListItem';
var _ = require('lodash');

import { connect } from 'react-redux';
import {actionSetSavedQueries} from '../../actions/queryDialog';


class _SavedQueriesList extends Component {

    constructor() {
        super();
        this.queriesRef = FIREBASE.database().ref('queries/');
        this.queriesListener = null;
    }

    componentDidMount() {
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
                {this.props.saved_queries.map(
                    saved_query => {
                        let query_item = this.props.saved_queries.filter(d => d.key == saved_query.key)[0];
                        return <SavedQueriesListItem key={saved_query.key}
                                                     queryKey={saved_query.key}
                                                     queryItemQuery={query_item.query}
                                                     savedQuery = {saved_query} />
                    }
                )}
                <VisibleSaveQueryButton query={this.props.query}/>
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



