/**
 * Created by perandre on 6/23/16.
 */

import React from 'react';
import {appbarStyles, headerButton} from '../../styles/componentStyles';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import VisibleQueryDialog from '../logic/visibleQueryDialog'
import {Link} from 'react-router';
import FIREBASE from '../../constants/firebase';
var moment = require('moment');

var d3 = require('d3');
var _ = require('lodash');


class AppContent extends React.Component {

    constructor() {
        super();
        this.queriesRef = FIREBASE.database().ref('queries/');
        this.columnsRef = FIREBASE.database().ref('columns/');
        this.queriesListener = null;
    }

    componentDidMount() {
        this.queriesListener = this.queriesRef.on('value', (data) => {
            const ordered_saved_queries = _.values(data.val()).sort( (a,b) => {
                return a.created_at > b.created_at
            });
            this.props.dispatchSetSavedQueries(ordered_saved_queries)
        });
        this.columnsListener = this.columnsRef.on('value', (data) => {
            this.props.dispatchAddColumnsCustom(data.val());
            this.props.dispatchApplyColumns()
        })
    }

    componentWillUnmount() {
        this.queriesListener.off();
        this.columnsListener.off();
    }

    render() {

        return (
            <div>
                <VisibleQueryDialog/>
                <Drawer open={true} zDepth={1} docked={true} >
                    <div style={{height: '64px', width: '100%', color: 'rgb(243,243,243)',
                        backgroundColor: 'rgb(70,77,91)', textAlign: 'center',
                        display: 'flex', justifyContent: 'center'
                        }}>
                        <h3>Saved Queries </h3>
                    </div>
                    <div style = {{height: '32px'}}></div>
                    {
                        this.props.saved_queries.map( loc => {
                            let key = loc.key;
                            let query_item = this.props.saved_queries.filter(d => d.key == key)[0];
                            var query = query_item.query;
                            return (
                                <div key={loc.name} style={{display: 'flex'}}>
                                    <Link to={'/timeline/'+ query} style={{textDecoration: 'none'}}>
                                    <MenuItem style={{width: '210px'}} id={loc.name}
                                              onClick={() => {
                                                this.props.dispatchApplyQueryCustom(query);
                                              }}
                                    > {loc.name} </MenuItem>
                                    </Link>
                                    <IconMenu
                                        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                                        anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                                        targetOrigin={{horizontal: 'left', vertical: 'top'}}
                                        style={{marginLeft: 'auto'}}
                                    >
                                        <MenuItem primaryText="Delete"
                                            onClick={() => {
                                                FIREBASE.database().ref('/queries/'+key).remove()
                                            }}/>
                                        <MenuItem primaryText="Edit"
                                                  onClick={() => {
                                                    this.props.dispatchTempQuery(loc.query);
                                                    this.props.dispatchSetQueryName(loc.name);
                                                    this.props.dispatchSetEditMode(true);
                                                    this.props.dispatchSetEditJson(loc);
                                                    this.props.dispatchOpenQueryDialog()
                                            }}/>
                                    </IconMenu>
                                </div>
                            )
                    })}
                    <div style={{width:'100%', marginTop: '32px', display:'flex', justifyContent:'center'}}>
                        <RaisedButton label="Save Query"
                                  onClick={() => {
                                    this.props.dispatchTempQuery(this.props.query);
                                    this.props.dispatchSetQueryName("");
                                    this.props.dispatchSetEditMode(false);
                                    this.props.dispatchOpenQueryDialog()
                                  }}/>
                    </div>


                </Drawer>

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