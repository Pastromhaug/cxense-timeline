/**
 * Created by perandre on 6/9/16.
 */

import React from 'react';
import {cardStyles, cardHeaderStyles} from '../../styles/componentStyles';
import {Card, CardTitle} from 'material-ui/Card';
import VisibleTimelineTable from './../logic/visibleTimelineTable';
import VisibleMainChart from '../logic/visibleMainChart';
import VisibleMiniChart from '../logic/visibleMiniChart';
import {COLORS} from '../../constants/colorCode';

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
                        <VisibleMainChart getColors={Cards.getColors}/>
                        <VisibleMiniChart getColors={Cards.getColors}/>
                    </div>
                </Card>
                <Card style={cardStyles.container}>
                    <VisibleTimelineTable/>
                </Card>
            </div>
        );
    }

    static getColors(issue) {
        var status1 = ['Resolved', 'Closed'];
        var group1 = ['None', 'Not started' + 'Functional spec in progress'];
        var group2 = ['Functional spec done', 'Dev planning in progress']
        if (status1.indexOf(issue.status) != -1 && issue.resolution === 'Fixed') {
            return COLORS.a;
        }
        else if (status1.indexOf(issue.status) != -1 && issue.resolution === "Won't Fix") {
            return COLORS.b;
        }
        else if (status1.indexOf(issue.status) == -1 &&
            (group1.indexOf(issue.resolution) != -1 || group1.indexOf(issue.resolution2) != -1)) {
            return COLORS.c;
        }
        else if (status1.indexOf(issue.status) == -1 &&
            (group2.indexOf(issue.resolution) != -1 || group2.indexOf(issue.resolution2) != -1)) {
            return COLORS.d;
        }
        else if (status1.indexOf(issue.status) == -1 &&
            (issue.resolution === 'Ready for coding' || issue.resolution2 === 'Ready for coding')) {
            return COLORS.d;
        }
        else if (status1.indexOf(issue.status) == -1 &&
            (issue.resolution === 'N/A' || issue.resolution2 === 'N/A')) {
            return COLORS.e;
        }
        else return COLORS.f;
    }
}

export default Cards

// <VisibleMainAxis style={{margin: '20px'}}/>