/**
 * Created by perandre on 6/23/16.
 */

import React from 'react';
import QueryDialog from './timeline/queryDialog';
import AppDrawer from './drawer/appDrawer';
import AppBar from './appBar';

/**
 * This is the top level component in the app, below index.js. It is the parent for all
 * visible components on the screen
 *
 * AppContent - consists of the skeleton of the UI. It contains:
 * AppDrawer - displayed on the left of the screen that has the saved queries
 * AppBar  - which is on the top of the screen
 * QueryDialog - which is the popup that displays when you click save query or edit an existing query,
 * this.props.children - which will be the content for either the chart and table, query selector,
 *      or column selector depending on what the route is
 */

class AppContent extends React.Component {
    

    render() {

        return (
            <div>
                <QueryDialog/> {/*doesn't display by default, appears when you click 'save query' , or edit existing query*/}
                <AppDrawer/> {/*always displayed on the left side, containing the saved queries*/}
                <div style={{marginLeft: 256}}>
                    <AppBar/> {/*always displayed on the top, containing links to 'timeline', 'queries' ,and 'columns'*/}
                    <div style={{padding: '16px'}}>
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}

export default AppContent;