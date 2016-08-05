/**
 * Created by perandre on 6/23/16.
 */

import React from 'react';
import VisibleQueryDialog from '../logic/visibleQueryDialog'
import AppDrawer from '../presentation/appDrawer';
import VisibleAppBar from '../logic/visibleAppBar';


class AppContent extends React.Component {
    

    render() {

        return (
            <div>
                <VisibleQueryDialog/>
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