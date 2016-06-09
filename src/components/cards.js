/**
 * Created by perandre on 6/9/16.
 */

import React from 'react';
import AppBar from 'material-ui/AppBar';
import {appbarStyles, cardStyles} from '../styles/componentStyles';
import {Card} from 'material-ui/Card';
import Chart from './chart';

class Cards extends React.Component {
    render() {
        return(
            <div>
                <AppBar
                    title="Project Overview"
                    showMenuIconButton={false}
                    style={appbarStyles.container}
                />
                <Card style={cardStyles.container}>
                    <Chart/>
                </Card>
            </div>
        )
    }
}

export default Cards