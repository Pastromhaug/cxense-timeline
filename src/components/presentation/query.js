/**
 * Created by perandre on 6/13/16.
 */


/**
 * Created by perandre on 6/9/16.
 */

import React from 'react';
import {cardStyles} from '../../styles/componentStyles';
import {Card} from 'material-ui/Card';
import VisibleRangedDatePicker from '../logic/visibleRangedDatePicker';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {button, queryField, radioButton, radioButtonGroup, daysTextField} from '../../styles/componentStyles';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import {Link} from 'react-router'


const Query = ({query_temp, start_day, end_day, dispatchTempFixedOrRelative,
    dispatchTempStartDay, dispatchTempEndDay, dispatchTempQuery,
    dispatchApplyQuery, dispatchCancelQuery}) => (

    <div>
        <Card style={cardStyles.container} >
            <TextField
                style={queryField}
                hintText="Query"
                floatingLabelText="Query"
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