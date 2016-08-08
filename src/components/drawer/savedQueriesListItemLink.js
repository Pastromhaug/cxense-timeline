/**
 * Created by perandre on 05.08.16.
 */

import React, {Component} from 'react';
import {Link} from 'react-router';
import MenuItem from 'material-ui/MenuItem';
import {connect} from 'react-redux';
import {actionApplyQueryCustom} from '../../actions/query';
import {actionLoadingStart,actionLoadingStop} from '../../actions/loading';

/**
 * A subcomponent of a single row in the list of saved queriesin the left drawer.
 * The box containing the name of the query which when clicked
 * on changes the route to /timeline/:query for the selected query and changes the chart content
 * accordingly
 */

class _SavedQueriesListItemLink extends Component {
    render() {
        let query = this.props.saved_query.query;
        let name = this.props.saved_query.name;
        return (
            <Link to={'/timeline/'+ query} style={{textDecoration: 'none'}}>
                <MenuItem style={{width: '210px'}} id={name}
                          onClick={() => {
                                // Start the loading bar animation right above the chart
                                this.props.dispatchLoadingStart();
                                if (query === this.props.query) {
                                    // if it's the same query which is aleady on the chart,
                                    // stop the loading animation.
                                    this.props.dispatchLoadingStop();
                                }
                                // Change the selected query to that of the clicked saved query,
                                // causing the route to change and the chart/table to update.
                                this.props.dispatchApplyQueryCustom(query);
                          }}>
                    {name}
                </MenuItem>
            </Link>
        )
    }
}


function mapStateToProps(state) {
    return {
        query: state.query.query.query
    }
}
function mapDispatchToProps(dispatch) {
    return {
        dispatchLoadingStart() {
            dispatch(actionLoadingStart())
        },
        dispatchLoadingStop() {
            dispatch(actionLoadingStop())
        },
        dispatchApplyQueryCustom(query) {
            dispatch(actionApplyQueryCustom(query))
        }
    }
}
const SavedQueriesListItemLink = connect (
    mapStateToProps,
    mapDispatchToProps
)(_SavedQueriesListItemLink);

export default SavedQueriesListItemLink;
