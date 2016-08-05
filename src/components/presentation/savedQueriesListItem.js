/**
 * Created by perandre on 05.08.16.
 */

import React, {Component} from 'react';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {Link} from 'react-router';

export default class SavedQueriesListItem extends Component {

    render() {
        return (
            <div key={this.props.savedQuery.name} style={{display: 'flex'}}>
                <Link to={'/timeline/'+ this.props.queryItemQuery} style={{textDecoration: 'none'}}>
                    <MenuItem style={{width: '210px'}} id={this.props.savedQuery.name}
                              onClick={() => {
                                                this.props.dispatchLoadingStart();
                                                if (this.props.queryItemQuery === this.props.query) {
                                                    this.props.dispatchLoadingStop();
                                                }
                                                this.props.dispatchApplyQueryCustom(this.props.queryItemQuery);
                                              }}
                    > {this.props.savedQuery.name} </MenuItem>
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
                                                    this.props.dispatchTempQuery(this.props.savedQuery.query);
                                                    this.props.dispatchSetQueryName(this.props.savedQuery.name);
                                                    this.props.dispatchSetEditMode(true);
                                                    this.props.dispatchSetEditJson(this.props.savedQuery);
                                                    this.props.dispatchOpenQueryDialog()
                                            }}/>
                </IconMenu>
            </div>
        )
    }
}