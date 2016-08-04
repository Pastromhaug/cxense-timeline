/**
 * Created by perandre on 6/9/16.
 */

import React from 'react';
import {cardStyles} from '../../styles/componentStyles';
import {Card} from 'material-ui/Card';
import VisibleTimelineTable from './../logic/visibleTimelineTable';
import VisibleMainChart from '../logic/visibleMainChart';
import VisibleCardTitleAndOptions from '../logic/visibleCardTitleAndOptions';
import VisibleLoader from '../logic/visibleLoader';


class  Cards extends React.Component {

    render() {
        return(
            <div>
                <Card style={cardStyles.container}>
                    <VisibleCardTitleAndOptions/>
                    <VisibleLoader/>
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

    componentDidMount() {
        var params = this.props.params;
        if (_.has(params, 'query')) {
            console.log('Cards: has param query: ' + params.query);
            this.props.dispatchTempQuery(params.query);
        } else {
            console.log('Cards: no param query');
        }
        this.props.dispatchApplyQuery();
    }
}

export default Cards