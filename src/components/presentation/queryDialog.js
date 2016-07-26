/**
 * Created by perandre on 25.07.16.
 */

import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FIREBASE from '../../constants/firebase';
var md5 = require('md5');
var moment = require('moment');





class QueryDialog extends React.Component {
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
                    let key = md5(this.props.name);
                    FIREBASE.database().ref('queries/' + key).set({
                        query: this.props.query,
                        name: this.props.name,
                        start_time: this.props.start_time,
                        end_time: this.props.end_time,
                        created_at: moment.utc().valueOf(),
                        key: key
                    });
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
                    /><br />

                </Dialog>
            </div>
        );
    }
}

export default QueryDialog