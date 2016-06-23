/**
 * Created by perandre on 6/9/16.
 */

import React from 'react';
import {cardStyles} from '../../styles/componentStyles';
import {Card} from 'material-ui/Card';
import VisibleTimelineTable from './../logic/visibleTimelineTable';
import VisibleMainAxis from '../logic/visibleMainAxis';
import VisibleMainChart from '../logic/visibleMainChart';
import VisibleMiniChart from '../logic/visibleMiniChart';

class  Cards extends React.Component {

    render() {
        return(
            <div>
                <Card style={cardStyles.container}>
                    <VisibleMainAxis style={{margin: '20px'}}/>
                    <VisibleMainChart/>
                    <VisibleMiniChart/>
                </Card>
                <Card style={cardStyles.container}>
                    <VisibleTimelineTable/>
                </Card>
            </div>
        );
    }
}

export default Cards
