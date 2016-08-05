/**
 * Created by perandre on 6/13/16.
 */

import React from 'react';
import { TableRow, TableRowColumn} from 'material-ui/Table';
import {connect} from 'react-redux';
var moment = require('moment');
var _ = require('lodash');


class _AppTableRow extends React.Component {

    shouldComponentUpdate(nextProps) {
        if ( !(((this.props.hover == this.props.issue.id) && (nextProps.hover != this.props.issue.id)) ||
             ((this.props.hover != this.props.issue.id) && (nextProps.hover == this.props.issue.id)))){
            return false
        }
        return true
    }

    render() {
        var bgcolor = 'white';
        if (this.props.issue.id === this.props.hover) {
            bgcolor = 'yellow'
        }
        return (
            <TableRow key={this.props.issue.name} style={{backgroundColor: bgcolor}}>
                {this.props.col_info.map( (col) => {
                    var field_name = col.field_name;
                    var text = this.props.issue[field_name];
                    if (col.name === 'Planned End' || col.name === 'Planned Start') {
                        text = moment.utc(text).format('MMM D, YYYY');
                    }
                    else if (col.name == 'Rem Est') {
                        text = moment.utc(text).diff(0, 'days') + ' days'
                    }
                    else if (col.name == 'ID') {
                        let id = this.props.issue[field_name];
                        let link = "https://jira.cxense.com/browse/" + id;
                        text = <a href={link}  target="_blank"> {id} </a>
                    }
                    let colStyle = {}
                    if (_.has(col, 'width')) {
                        colStyle.width = col.width;
                    }
                    return (
                        <TableRowColumn key={field_name} style={colStyle}> {text} </TableRowColumn>
                    )
                })}
            </TableRow>
        )
    }

};


const mapStateToProps = (state) => {
    return {
        issues: state.issues,
        hover: state.table
    }
};

const AppTableRow = connect (
    mapStateToProps
)(_AppTableRow);

export default AppTableRow;