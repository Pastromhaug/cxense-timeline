/**
 * Created by perandre on 05.08.16.
 */

import React, {Component} from 'react';
import FIREBASE from '../../constants/firebase';
var _ = require('lodash');
import VisibleSaveQueryButton from '../logic/visibleSaveQueryButton';

import VisibleSavedQueriesItemList from '../logic/visibleSavedQueriesListItem';

export default class savedQueriesList extends Component {

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
                        let key = saved_query.key;
                        let query_item = this.props.saved_queries.filter(d => d.key == key)[0];
                        return <VisibleSavedQueriesItemList key={saved_query.key}
                                                            queryItemQuery={query_item.query}
                                                            savedQuery = {saved_query} />
                    }
                )}
                <VisibleSaveQueryButton query={this.props.query}/>
            </div>
        )
    }
}



