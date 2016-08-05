/**
 * Created by perandre on 05.08.16.
 */


import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {Link} from 'react-router';


import FIREBASE from '../../constants/firebase';
var moment = require('moment');
var d3 = require('d3');
var _ = require('lodash');

export default class AppDrawer extends Component {

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
                                                this.props.dispatchLoadingStart();
                                                if (query === this.props.query) {
                                                    this.props.dispatchLoadingStop();
                                                }
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
        )
    }
}