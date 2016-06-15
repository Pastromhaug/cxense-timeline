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
    dispatchApplyQuery}) => (

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
            <div style={{display: 'inline-block', marginLeft:'auto', marginRight:'auto'}}>
                <RadioButtonGroup
                    name="shipSpeed"
                    defaultSelected="light"
                    style={radioButtonGroup}
                    onChange={(event, data) => dispatchTempFixedOrRelative(data)}>
                    <RadioButton
                        value="light"
                        label="Fixed Dates"
                        style={radioButton}
                    />
                    <RadioButton
                        value="not_light"
                        label="Relative"
                        style={radioButton}
                    />
                </RadioButtonGroup>
                <div style={{display: 'inline'}}>
                    <VisibleRangedDatePicker/>
                    <div>
                        <TextField
                            style={daysTextField}
                            hintText = "start days ago"
                            floatingLabelText="start days ago"
                            floatingLabelFixed={false}
                            onChange={ (event, data) => dispatchTempStartDay(data)}
                            value={start_day}
                        /><br/>
                        <TextField
                            style={daysTextField}
                            hintText = "end days ago"
                            floatingLabelText="end days ago"
                            floatingLabelFixed={false}
                            onChange={ (event, data) => dispatchTempEndDay(data)}
                            value={end_day}
                        /><br/>
                    </div>
                </div>
            </div>
            <div style={{display:'block'}}>
                <RaisedButton style={button} label="Test Query"/>
            </div>
            <RaisedButton style={button} lassName="MyButton" label="Cancel"/>
            <Link to='/timeline'>
                <RaisedButton style={button} label="Apply"
                    onClick={() => dispatchApplyQuery()}/>
            </Link>
        </Card>
    </div>
);

export default Query