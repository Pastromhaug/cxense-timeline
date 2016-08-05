/**
 * Created by perandre on 25.07.16.
 */

import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FIREBASE from '../../constants/firebase';
import {connect} from 'react-redux';
import {actionOpenQueryDialog, actionCloseQueryDialog,
    actionSetQueryName} from '../../actions/queryDialog';
import {actionTempQuery} from '../../actions/query';
var md5 = require('md5');
var moment = require('moment');



class _QueryDialog extends React.Component {
    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={() =>this.props.dispatchCloseQueryDialog()}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                onTouchTap={() =>{
                    if (this.props.is_edit) {
                        let key = this.props.edit_json.key;
                        FIREBASE.database().ref('queries/' + key + '/query').set(this.props.query_temp);
                        FIREBASE.database().ref('queries/' + key + '/name').set(this.props.name);
                    } else {
                        let key = md5(moment.utc().valueOf().toString() + this.props.name);
                        FIREBASE.database().ref('queries/' + key).set({
                            query: this.props.query,
                            name: this.props.name,
                            start_time: this.props.start_time,
                            end_time: this.props.end_time,
                            created_at: moment.utc().valueOf(),
                            key: key
                        });
                    }

                    this.props.dispatchCloseQueryDialog()
                }}
            />
        ];

        return (
            <div>
                <Dialog
                    title="Save Query"
                    actions={actions}
                    modal={false}
                    open={this.props.queryDialog}
                    onRequestClose={() =>this.props.dispatchCloseQueryDialog()}
                >
                    <TextField
                        hintText="Query"
                        floatingLabelText="Query"
                        floatingLabelFixed={false}
                        multiLine={true}
                        style={{width:'100%'}}
                        onChange={(event, data) => this.props.dispatchTempQuery(data)}
                        value={this.props.query_temp}
                    /><br />

                    <TextField
                        hintText="Name"
                        floatingLabelText="Name"
                        floatingLabelFixed={false}
                        onChange={(event, data) => this.props.dispatchSetQueryName(data)}
                        value={this.props.name}
                    /><br />

                </Dialog>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        queryDialog: state.queryDialog.open,
        query_temp : state.query.query_temp.query,
        query: state.query.query.query,
        name: state.queryDialog.name,
        is_edit: state.queryDialog.is_edit,
        edit_json: state.queryDialog.edit_json
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchOpenQueryDialog() {
            dispatch(actionOpenQueryDialog())
        },
        dispatchCloseQueryDialog() {
            dispatch(actionCloseQueryDialog())
        },
        dispatchTempQuery(temp_query) {
            dispatch(actionTempQuery(temp_query))
        },
        dispatchSetQueryName(name) {
            dispatch(actionSetQueryName(name))
        }
    }
};

const QueryDialog = connect (
    mapStateToProps,
    mapDispatchToProps
)(_QueryDialog);

export default QueryDialog