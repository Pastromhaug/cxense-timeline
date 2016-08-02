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


const Query = ({query_temp, start_day, end_day,
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

            <RaisedButton style={button} lassName="MyButton" label="Cancel"
                onClick={ () => dispatchCancelQuery()}/>
            <Link to={'/timeline/'+ query_temp}>
                <RaisedButton style={button} label="Apply"
                    onClick={ () => dispatchApplyQuery()}/>
            </Link>
        </Card>
    </div>
);

export default Query