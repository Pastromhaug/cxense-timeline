/**
 * Created by perandre on 6/9/16.
 */

import React from 'react';
import {cardStyles} from '../styles/componentStyles';
import {Card} from 'material-ui/Card';
import Chart from './chart';
import TimelineTable from './presentation/timelineTable';

class Cards extends React.Component {
    constructor() {
        super();
        console.log('cards');
    }

    render() {
        return(
            <div>
                <Card style={cardStyles.container}>
                    <Chart/>
                </Card>
                <Card style={cardStyles.container}>
                    <TimelineTable/>
                </Card>
            </div>
        )
    }
}

export default Cards