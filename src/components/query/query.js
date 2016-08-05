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


const _Query = ({query_temp, start_day, end_day,
    dispatchTempQuery, dispatchApplyQuery, dispatchCancelQuery}) => (

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
        query_temp : state.query.query_temp.query,
        start_day : state.query.query_temp.start_day,
        end_day : state.query.query_temp.end_day
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