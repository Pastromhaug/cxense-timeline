/**
 * Created by perandre on 25.07.16.
 */

import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

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
                onTouchTap={() =>this.props.dispatchCloseQueryDialog()}
            />
        ];

        return (
            <div>
                <Dialog
                    title="Dialog With Actions"
                    actions={actions}
                    modal={false}
                    open={this.props.queryDialog}
                    onRequestClose={() =>this.props.dispatchCloseQueryDialog()}
                >
                    The actions in this window were passed in as an array of React objects.
                </Dialog>
            </div>
        );
    }
}

export default QueryDialog