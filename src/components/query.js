/**
 * Created by perandre on 6/13/16.
 */


/**
 * Created by perandre on 6/9/16.
 */

import React from 'react';
import {cardStyles} from '../styles/componentStyles';
import {Card} from 'material-ui/Card';
import RangedDatePicker from './rangedDatePicker';
import TextField from 'material-ui/TextField';


class Query extends React.Component {
    constructor() {
        super();
        console.log('query');
    }

    render() {
        return(
            <div>
                <Card style={cardStyles.container}>
                    <TextField
                        hintText="Query"
                        floatingLabelText="Query"
                        floatingLabelFixed={false}
                        fullWidth={true}
                    /><br />
                    <RangedDatePicker/>
                </Card>
            </div>
        )
    }
}

export default Query