/**
 * Created by perandre on 6/23/16.
 */

import React from 'react';
import QueryDialog from '../presentation/queryDialog';
import AppDrawer from '../presentation/appDrawer';
import AppBar from './appBar';


class AppContent extends React.Component {
    

    render() {

        return (
            <div>
                <QueryDialog/>
                <AppDrawer/>
                <div style={{marginLeft: 256}}>
                    <AppBar/>
                    <div style={{padding: '16px'}}>
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}

export default AppContent;