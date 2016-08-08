/**
 * Created by perandre on 05.08.16.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {appbarStyles, headerButton} from '../styles/componentStyles';
import FlatButton from 'material-ui/FlatButton';
import {Link} from 'react-router';

/**
 * This component is the dark blue gray bar at the top of the app that is visible at all times.
 * It contains three links, to the /timeline/:query route, /query route, and /columns route.
 */
class _AppBar extends Component {

    render() {
        return (
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
        )
    }
}

const mapStateToProps = (state) => {
    return {
        query: state.query.query.query
    }
};


const AppBar = connect (
    mapStateToProps
)(_AppBar);

export default AppBar;