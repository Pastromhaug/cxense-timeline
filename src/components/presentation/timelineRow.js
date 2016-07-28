/**
 * Created by perandre on 6/13/16.
 */

import React from 'react';
import { TableRow, TableRowColumn} from 'material-ui/Table';
import {COLUMNS} from '../../constants/columnConstants';
var moment = require('moment');


class TimelineRow extends React.Component {

    shouldComponentUpdate(nextProps,nextState) {
        // console.log('componentShouldUpdate');
        if ( !(((this.props.hover == this.props.issue.id) && (nextProps.hover != this.props.issue.id)) ||
             ((this.props.hover != this.props.issue.id) && (nextProps.hover == this.props.issue.id)))){
            return false
        }
        return true
    }

    render() {
        var col_info = COLUMNS.filter( (COL) => this.props.columns.indexOf(COL.name) !== -1);
        var bgcolor = 'white';
        if (this.props.issue.id === this.props.hover) {
            bgcolor = 'yellow'
        }
        return (
            <TableRow key={this.props.issue.name} style={{backgroundColor: bgcolor}}>
                {col_info.map( (col) => {
                    var field_name = col.field_name;
                    var text = this.props.issue[field_name];
                    if (col.name === 'Planned End' || col.name === 'Planned Start') {
                        text = moment.utc(text).format('MMM D, YYYY');
                    }
                    else if (col.name == 'Remaining Estimate') {
                        text = moment.utc(text).diff(0, 'days') + ' days'
                    }
                    else if (col.name == 'ID') {
                        let id = this.props.issue[field_name];
                        let link = "https://jira.cxense.com/browse/" + id + "?jql=issue=" + id;
                        text = <a href={link}> {id} </a>
                    }
                    return (
                        <TableRowColumn key={field_name}> {text} </TableRowColumn>
                    )
                })}
            </TableRow>
        )
    }

};



export default TimelineRow;