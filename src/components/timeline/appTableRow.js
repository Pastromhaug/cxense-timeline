/**
 * Created by perandre on 6/13/16.
 */

import React from 'react';
import { TableRow, TableRowColumn} from 'material-ui/Table';
import {connect} from 'react-redux';
var moment = require('moment');
var _ = require('lodash');


/**
 * This component is a single row in the body of the table in the '/timeline/:query' page
 */

class _AppTableRow extends React.Component {


    /**
     * When you hover over a chart issue, the corresponding row got highlighted. This was causing noticably
     * bad performance because each row takes 'state.table' as a prop, causing each row to update every time
     * you hovered over or off a new rectangle.
     * To fix this I added this shouldComponentUpdate function.
     *
     * @param nextProps
     * @returns {boolean}
     */
    shouldComponentUpdate(nextProps) {
        // make sure the row only updates if the row effected by 'hover' prop
        if ( (this.props.hover == this.props.issue.id) ||
               (nextProps.hover == this.props.issue.id) ){
            return true
        }
        return false
    }

    render() {
        // if the row's corresponding chart rectangle is hovered over, it should be yellow
        var bgcolor = 'white';
        if (this.props.issue.id === this.props.hover) {
            bgcolor = 'yellow'
        }
        return (
            <TableRow key={this.props.issue.name} style={{backgroundColor: bgcolor}}>
                {/*loop through the columns selected and add them to the row*/}
                {this.props.col_info.map( (col) => {
                    var field_name = col.field_name;
                    var text = this.props.issue[field_name];

                    // planned start and planned end fields must be converted from
                    // unix milliseconds to a readable data
                    if (col.name === 'Planned End' || col.name === 'Planned Start') {
                        text = moment.utc(text).format('MMM D, YYYY');
                    }
                    // remaining estimate field must be converted from unix milliseconds
                    // into a readable number of days
                    else if (col.name == 'Rem Est') {
                        text = moment.utc(text).diff(0, 'days') + ' days'
                    }

                    // the 'ID' field will be a link to the issue in jira.
                    else if (col.name == 'ID') {
                        let id = this.props.issue[field_name];
                        let link = "https://jira.cxense.com/browse/" + id;
                        text = <a href={link}  target="_blank"> {id} </a>
                    }

                    // some columns have their width specified in pixels so that they don't
                    // take up too much space
                    let colStyle = {};
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