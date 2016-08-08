/**
 * Created by perandre on 05.08.16.
 */

import React, {Component} from 'react';
import SavedQueriesListItemLink from './savedQueriesListItemLink';
import SavedQueriesListItemMenu from './savedQueriesListItemMenu';

/**
 * This component is a single row in the list of saved queries in the left drawer. it Contains
 * @SavedQueriesListItemLink - which is the box containing the name of the query which when clicked
 * on changes the rotue to /timeline/:query for the selected query and changes the chart content
 * accordingly
 * @SavedQueriesListItemMenu - the small dropdown to the right of each query name. 
 */

export default class SavedQueriesListItem extends Component {
    render() {
        return (
            <div style={{display: 'flex'}}>
                <SavedQueriesListItemLink saved_query={this.props.saved_query}/>
                <SavedQueriesListItemMenu saved_query={this.props.saved_query}/>
            </div>
        )
    }
}