/**
 * Created by perandre on 6/23/16.
 */

import React from 'react';
import QueryDialog from '../presentation/queryDialog';
import AppDrawer from '../presentation/appDrawer';
import VisibleAppBar from '../logic/visibleAppBar';


class AppContent extends React.Component {
    

    render() {

        return (
            <div>
                <QueryDialog/>
                <AppDrawer/>
                <div style={{marginLeft: 256}}>
                    <VisibleAppBar/>
                    <div style={{padding: '16px'}}>
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}

export default AppContent;