/**
 * Created by perandre on 05.08.16.
 */


import React, {Component} from 'react';
import Drawer from 'material-ui/Drawer';
import SavedQueriesList from './savedQueriesList';

/**
 * The drawer that is always on display on the left side of the app.
 * Contains a list of saved queries.
 */

export default class AppDrawer extends Component {

    render() {
        return (
            <Drawer open={true} zDepth={1} docked={true} >
                {/*dark blue-gray header at the top of the drawer*/}
                <div style={{height: '64px', width: '100%', color: 'rgb(243,243,243)',
                        backgroundColor: 'rgb(70,77,91)', textAlign: 'center',
                        display: 'flex', justifyContent: 'center'
                        }}>
                    <h3 style={{fontSize: '1.17em',fontWeight: 'bold',
                        marginBottom: '12px', marginTop: '12px'}}>
                        Saved Queries
                    </h3>
                </div>
                {/*Space of 12px between the header and the list*/}
                <div style = {{height: '12px'}}></div>
                {/*List of saved queries*/}
                <SavedQueriesList/>
            </Drawer>
        )
    }
}