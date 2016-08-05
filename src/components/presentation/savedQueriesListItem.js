/**
 * Created by perandre on 05.08.16.
 */

import React, {Component} from 'react';
import SavedQueriesListItemLink from './savedQueriesListItemLink';
import SavedQueriesListItemMenu from './savedQueriesListItemMenu';


export default class SavedQueriesListItem extends Component {
    render() {
        return (
            <div style={{display: 'flex'}}>
                <SavedQueriesListItemLink queryItemQuery={this.props.queryItemQuery}
                                          savedQuery={this.props.savedQuery}/>
                <SavedQueriesListItemMenu savedQuery={this.props.savedQuery}
                                          queryKey={this.props.queryKey}/>
            </div>
        )
    }
}