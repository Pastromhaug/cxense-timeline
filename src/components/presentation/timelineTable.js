/**
 * Created by perandre on 6/13/16.
 */

import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {COLUMNS} from '../../constants/constants';


const TimelineTable = ({columns, issues, brush_start, brush_end}) => {

    function makeIssueRows() {
        var vis_issues = issues.filter(  (d) =>  (
            d.start < brush_end && d.end > brush_start)
        );

        var col_info = COLUMNS.filter( (COL) => columns.indexOf(COL.name) !== -1);
        return vis_issues.map( (issue) => (
            <TableRow key={issue.name}>
                {col_info.map( (col) => {
                    var field_name = col.field_name;
                    return (
                        <TableRowColumn key={field_name}> {issue[field_name]} </TableRowColumn>
                    )
                })}
            </TableRow>
        ))
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