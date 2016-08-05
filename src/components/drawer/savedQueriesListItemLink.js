/**
 * Created by perandre on 05.08.16.
 */

import React, {Component} from 'react';
import {Link} from 'react-router';
import MenuItem from 'material-ui/MenuItem';
import {connect} from 'react-redux';
import {actionApplyQueryCustom} from '../../actions/query';
import {actionLoadingStart,actionLoadingStop} from '../../actions/loading';


class _SavedQueriesListItemLink extends Component {
    render() {
        return (
            <Link to={'/timeline/'+ this.props.queryItemQuery} style={{textDecoration: 'none'}}>
                <MenuItem style={{width: '210px'}} id={this.props.savedQuery.name}
                          onClick={() => {
                                this.props.dispatchLoadingStart();
                                if (this.props.queryItemQuery === this.props.query) {
                                    this.props.dispatchLoadingStop();
                                }
                                this.props.dispatchApplyQueryCustom(this.props.queryItemQuery);
                          }}
                > {this.props.savedQuery.name} </MenuItem>
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
