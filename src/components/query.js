/**
 * Created by perandre on 6/13/16.
 */


/**
 * Created by perandre on 6/9/16.
 */

import React from 'react';
import {cardStyles} from '../styles/componentStyles';
import {Card} from 'material-ui/Card';

class Query extends React.Component {
    constructor() {
        super();
        console.log('query');
    }

    render() {
        return(
            <div>
                <Card style={cardStyles.container}>
                    blablabla
                </Card>
            </div>
        )
    }
}

export default Query