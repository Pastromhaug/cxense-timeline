/**
 * Created by perandre on 6/9/16.
 */

import React from 'react';
import {cardStyles} from '../../styles/componentStyles';
import {Card} from 'material-ui/Card';
import Chart from './chart';
import VisibleTimelineTable from './../logic/visibleTimelineTable';

const  Cards = () => {
    return(
        <div>
            <Card style={cardStyles.container}>
                <Chart/>
            </Card>
            <Card style={cardStyles.container}>
                <VisibleTimelineTable/>
            </Card>
        </div>
    )
};

export default Cards