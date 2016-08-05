/**
 * Created by perandre on 6/23/16.
 */

import React from 'react';
import {appbarStyles, headerButton} from '../../styles/componentStyles';
import FlatButton from 'material-ui/FlatButton';
import VisibleQueryDialog from '../logic/visibleQueryDialog'
import {Link} from 'react-router';
import VisibleAppDrawer from '../logic/visibleAppDrawer';


class AppContent extends React.Component {
    

    render() {

        return (
            <div>
                <VisibleQueryDialog/>
                <VisibleAppDrawer/>
                <div style={{marginLeft: 256}}>
                    <div  style={appbarStyles.container}>

                        <Link className="MyLink" to={"/timeline/" + this.props.query}  >
                            <FlatButton style={headerButton.container}>Timeline</FlatButton>
                        </Link>

                        <Link className="MyLink" to="/query">
                            <FlatButton style={headerButton.container}>Edit Query</FlatButton>
                        </Link>

                        <Link className="MyLink" to="/columns" >
                            <FlatButton style={headerButton.container}>Configure Columns</FlatButton>
                        </Link>

                    </div>
                <div style={{padding: '16px'}}>
                    {this.props.children}
                </div>
                </div>
            </div>
        )
    }
}

export default AppContent;