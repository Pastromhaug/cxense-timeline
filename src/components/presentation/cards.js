/**
 * Created by perandre on 6/9/16.
 */

import React from 'react';
import {cardStyles, cardHeaderStyles} from '../../styles/componentStyles';
import {Card, CardHeader, CardTitle} from 'material-ui/Card';
import VisibleTimelineTable from './../logic/visibleTimelineTable';
import VisibleMainAxis from '../logic/visibleMainAxis';
import VisibleMainChart from '../logic/visibleMainChart';
import VisibleMiniChart from '../logic/visibleMiniChart';

class  Cards extends React.Component {

    render() {
        return(
            <div>
                <Card style={cardStyles.container}>
                    <div
                        style={cardHeaderStyles}>
                        <CardTitle style={{padding: '0px'}}> {this.props.query} </CardTitle>
                    </div>
                    <div style={{padding: '16px'}}>
                        <VisibleMainAxis style={{margin: '20px'}}/>
                        <VisibleMainChart/>
                        <VisibleMiniChart/>
                    </div>
                </Card>
                <Card style={cardStyles.container}>
                    <VisibleTimelineTable/>
                </Card>
            </div>
        );
    }
}

export default Cards
