/**
 * Created by perandre on 05.08.16.
 */


import React, {Component} from 'react';
import Drawer from 'material-ui/Drawer';
import SavedQueriesList from '../presentation/savedQueriesList';


export default class AppDrawer extends Component {

    render() {
        return (
            <Drawer open={true} zDepth={1} docked={true} >
                <div style={{height: '64px', width: '100%', color: 'rgb(243,243,243)',
                        backgroundColor: 'rgb(70,77,91)', textAlign: 'center',
                        display: 'flex', justifyContent: 'center'
                        }}>
                    <h3 style={{fontSize: '1.17em',fontWeight: 'bold',
                        marginBottom: '12px', marginTop: '12px'}}>
                        Saved Queries
                    </h3>
                </div>
                <div style = {{height: '12px'}}></div>
                <SavedQueriesList/>
            </Drawer>
        )
    }
}