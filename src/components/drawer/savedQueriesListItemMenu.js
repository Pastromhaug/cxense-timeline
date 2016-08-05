/**
 * Created by perandre on 05.08.16.
 */

import React, {Component} from 'react';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import FIREBASE from '../../constants/firebase';

import { connect } from 'react-redux';
import {actionOpenQueryDialog,actionSetEditJson,
    actionSetEditMode, actionSetQueryName} from '../../actions/queryDialog';
import {actionTempQuery,} from '../../actions/query';


class _SavedQueriesListItemMenu extends Component {
    render() {
        return (
            <IconMenu
                iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                targetOrigin={{horizontal: 'left', vertical: 'top'}}
                style={{marginLeft: 'auto'}}>
                <MenuItem primaryText="Delete"
                          onClick={() => {
                             FIREBASE.database().ref('/queries/'+this.props.queryKey).remove()
                          }}/>
                <MenuItem primaryText="Edit"
                          onClick={() => {
                              this.props.dispatchTempQuery(this.props.savedQuery.query);
                              this.props.dispatchSetQueryName(this.props.savedQuery.name);
                              this.props.dispatchSetEditMode(true);
                              this.props.dispatchSetEditJson(this.props.savedQuery);
                              this.props.dispatchOpenQueryDialog()
                          }}/>
            </IconMenu>
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
        dispatchOpenQueryDialog: () => {
            dispatch(actionOpenQueryDialog())
        },
        dispatchTempQuery(temp_query) {
            dispatch(actionTempQuery(temp_query))
        },

        dispatchSetEditJson(edit_json) {
            dispatch(actionSetEditJson(edit_json))
        },
        dispatchSetEditMode(to_edit) {
            dispatch(actionSetEditMode(to_edit))
        },
        dispatchSetQueryName(name) {
            dispatch(actionSetQueryName(name))
        },
    }
};

const SavedQueriesListItemMenu = connect (
    mapStateToProps,
    mapDispatchToProps
)(_SavedQueriesListItemMenu);

export default SavedQueriesListItemMenu;
