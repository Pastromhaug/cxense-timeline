/**
 * Created by perandre on 6/13/16.
 */

import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {COLUMNS} from '../../constants/columnConstants';
var moment = require('moment');


const TimelineTable = ({columns, issues, brush_start, brush_end, hover}) => {

    function makeIssueRows() {
        var vis_issues = issues.filter(  (d) =>  (
            d.start < brush_end && d.end > brush_start)
        );


        var col_info = COLUMNS.filter( (COL) => columns.indexOf(COL.name) !== -1);
        return vis_issues.map( (issue) => {
            var bgcolor = 'white';
            if (issue.id === hover) {
                bgcolor = 'yellow'
            }
            return (
                <TableRow key={issue.name} style={{backgroundColor: bgcolor}}>
                    {col_info.map( (col) => {
                        var field_name = col.field_name;
                        var text = issue[field_name];
                        if (col.name === 'Planned End' || col.name === 'Planned Start') {
                            text = moment.utc(text).format('MMM D, YYYY');
                        }
                        else if (col.name == 'Remaining Estimate') {
                            text = moment.utc(text).diff(0, 'days') + ' days'
                        }
                        else if (col.name == 'ID') {
                            let id = issue[field_name];
                            let link = "https://jira.cxense.com/browse/" + id + "?jql=issue=" + id;
                            text = <a href={link}> {id} </a>
                        }
                        return (
                            <TableRowColumn key={field_name}> {text} </TableRowColumn>
                        )
                    })}
                </TableRow>
            )
        })
    }

    return (
        <Table>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow>
                    {columns.map( (col_name) => (
                        <TableHeaderColumn key={col_name}>{col_name}</TableHeaderColumn>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
                {makeIssueRows()}
            </TableBody>
        </Table>
    )
};



export default TimelineTable;