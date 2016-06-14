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
import {button, queryField, radioButton, radioButtonGroup} from '../../styles/componentStyles';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';


class Query extends React.Component {
    constructor() {
        super();
        console.log('query');
    }

    render() {

        return(
            <div>
                <Card style={cardStyles.container} style={{textAlign: 'center'}}>
                    <TextField
                        style={queryField}
                        hintText="Query"
                        floatingLabelText="Query"
                        floatingLabelFixed={false}
                        fullWidth={true}
                    /><br />
                    <div style={{display: 'inline-block', marginLeft:'auto', marginRight:'auto'}}>
                        <RadioButtonGroup name="shipSpeed" defaultSelected="not_light"  style={radioButtonGroup}>
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
                        <VisibleRangedDatePicker style={{float:'left'}}/>
                        <TextField
                            hintText = "start days ago"
                            floatingLabelText="start days ago"
                            floatingLabelFixed={false}
                        /><br/>
                        <TextField
                            hintText = "end days ago"
                            floatingLabelText="end days ago"
                            floatingLabelFixed={false}
                        /><br/>
                    </div>
                    <div style={{display:'block'}}>
                        <RaisedButton style={button} label="Test Query"/>
                    </div>
                    <RaisedButton style={button} lassName="MyButton" label="Cancel"/>
                    <RaisedButton style={button} label="Launch Query"/>
                </Card>
            </div>
        )
    }
}

export default Query