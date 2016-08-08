/**
 * Created by perandre on 05.08.16.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import {actionOpenQueryDialog,
    actionSetEditMode, actionSetQueryName} from '../../actions/queryDialog';
import {actionTempQuery, actionApplyQueryCustom} from '../../actions/query';

/**
 * This component is the button below the list of saved queries in the left drawer
 */

class _SaveQueryButton extends Component {
    render() {
        return (
            <div style={{width:'100%', marginTop: '32px', display:'flex', justifyContent:'center'}}>
                <RaisedButton label="Save Query"
                              onClick={() => {
                                    // opens the popup window that allows you to edit the query,
                                    // query name, and save the query to firebase
                                    this.props.dispatchTempQuery(this.props.query);
                                    this.props.dispatchSetQueryName("");
                                    this.props.dispatchSetEditMode(false);
                                    this.props.dispatchOpenQueryDialog()
                                  }}/>
            </div>
        )
    }
}

function mapStateToProps() {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchOpenQueryDialog: () => {
            dispatch(actionOpenQueryDialog())
        },
        dispatchTempQuery(temp_query) {
            dispatch(actionTempQuery(temp_query))
        },
        dispatchApplyQueryCustom(query) {
            dispatch(actionApplyQueryCustom(query))
        },
        dispatchSetEditMode(to_edit) {
            dispatch(actionSetEditMode(to_edit))
        },
        dispatchSetQueryName(name) {
            dispatch(actionSetQueryName(name))
        }
    }
}


const SaveQueryButton = connect (
    mapStateToProps,
    mapDispatchToProps
)(_SaveQueryButton);

export default SaveQueryButton;