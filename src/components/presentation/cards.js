/**
 * Created by perandre on 6/9/16.
 */

import React from 'react';
import {cardStyles} from '../../styles/componentStyles';
import {Card} from 'material-ui/Card';
import VisibleTimelineTable from './../logic/visibleTimelineTable';
import VisibleMainChart from '../logic/visibleMainChart';
import VisibleCardTitleAndOptions from '../logic/visibleCardTitleAndOptions';


class  Cards extends React.Component {

    render() {
        return(
            <div>
                <VisibleCardTitleAndOptions/>
                <Card style={cardStyles.container}>
                    <div style={{padding: '16px'}}>
                        <VisibleMainChart/>
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