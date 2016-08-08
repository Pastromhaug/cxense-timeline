/**
 * Created by perandre on 6/13/16.
 */


/**
 * Created by perandre on 6/9/16.
 */

import React from 'react';
import {cardStyles} from '../../styles/componentStyles';
import {Card} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {button, queryField} from '../../styles/componentStyles';
import {Link} from 'react-router'

import { connect } from 'react-redux';
import {actionTempQuery,
    actionApplyQuery, actionCancelQuery} from '../../actions/query';

/**
 * 
 * @param query_temp - contains the string that is being typed or edited in the 'Query' text field.
 * @param dispatchTempQuery - function that takes the changes to the query text field and 
 * stores them in the redux store, and becomes the query_temp prop
 * @param dispatchApplyQuery - makes query_temp the query that is to be displayed in the timeline,
 * changing the route to /timeline/:query. This changes the chart and the table to reflect the new query
 * @param dispatchCancelQuery - reverts the query in query_temp to the query that is currently applied
 * @private
 */

const _Query = ({query_temp, dispatchTempQuery, dispatchApplyQuery, dispatchCancelQuery}) => (

    <div>
        <Card style={cardStyles.container} >
            <TextField
                style={queryField}
                hintText="Query"
                floatingLabelText="Query"
                multiLine={true}
                floatingLabelFixed={false}
                fullWidth={true}
                onChange={(event, data) => dispatchTempQuery(data)}
                value={query_temp}
            /><br />

            <RaisedButton style={button} className="MyButton" label="Cancel"
                onClick={ () => dispatchCancelQuery()}/>
            <Link to={'/timeline/'+ query_temp}>
                <RaisedButton style={button} label="Apply"
                    onClick={ () => dispatchApplyQuery()}/>
            </Link>
        </Card>
    </div>
);

const mapStateToProps = (state) => {
    return {
        query_temp : state.query.query_temp.query
    }
};

const mapDispatchToPRops = (dispatch) => {
    return {
        dispatchTempQuery(temp_query) {
            dispatch(actionTempQuery(temp_query))
        },

        dispatchApplyQuery() {
            dispatch(actionApplyQuery())
        },

        dispatchCancelQuery() {
            dispatch(actionCancelQuery())
        }
    }
};

const Query = connect (
    mapStateToProps,
    mapDispatchToPRops
)(_Query);

export default Query