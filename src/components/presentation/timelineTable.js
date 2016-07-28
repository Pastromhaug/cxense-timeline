/**
 * Created by perandre on 6/13/16.
 */

import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import VisibleTimelineRow from '../logic/visibleTimelineRow';
import {COLUMNS} from '../../constants/columnConstants';
var moment = require('moment');


const TimelineTable = ({columns, issues}) => {

    function makeIssueRows() {
        return issues.map( (issue) => <VisibleTimelineRow key={issue.name} issue={issue} />)
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