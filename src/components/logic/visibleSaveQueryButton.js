/**
 * Created by perandre on 05.08.16.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import {actionOpenQueryDialog,
    actionSetEditMode, actionSetQueryName} from '../../actions/queryDialog';
import {actionTempQuery, actionApplyQueryCustom} from '../../actions/query';


class SaveQueryButton extends Component {
    render() {
        return (
            <div style={{width:'100%', marginTop: '32px', display:'flex', justifyContent:'center'}}>
                <RaisedButton label="Save Query"
                              onClick={() => {
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


const VisibleSaveQueryButton = connect (
    mapStateToProps,
    mapDispatchToProps
)(SaveQueryButton);

export default VisibleSaveQueryButton;