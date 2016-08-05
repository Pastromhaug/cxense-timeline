/**
 * Created by perandre on 05.08.16.
 */

import React, {Component} from 'react';
import FIREBASE from '../../constants/firebase';
var moment = require('moment');
var d3 = require('d3');
var _ = require('lodash');
import VisibleSaveQueryButton from '../logic/visibleSaveQueryButton';

import VisibleSavedQueriesItemList from '../logic/visibleSavedQueriesListItem';

export default class savedQueriesList extends Component {

    constructor() {
        super();
        this.queriesRef = FIREBASE.database().ref('queries/');
        this.columnsRef = FIREBASE.database().ref('columns/');
        this.queriesListener = null;
    }

    componentDidMount() {
        this.queriesListener = this.queriesRef.on('value', (data) => {
            const ordered_saved_queries = _.values(data.val()).sort( (a,b) => {
                return a.created_at > b.created_at
            });
            this.props.dispatchSetSavedQueries(ordered_saved_queries)
        });
        this.columnsListener = this.columnsRef.on('value', (data) => {
            this.props.dispatchAddColumnsCustom(data.val());
            this.props.dispatchApplyColumns()
        })
    }

    componentWillUnmount() {
        this.queriesListener.off();
        this.columnsListener.off();
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
                <VisibleSaveQueryButton/>
            </div>
        )
    }
}



