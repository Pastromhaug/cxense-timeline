/**
 * Created by perandre on 6/13/16.
 */

import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';


class TimelineTable extends React.Component {
    render() {
        return (
            <Table>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                    <TableRow>
                        <TableHeaderColumn>Service</TableHeaderColumn>
                        <TableHeaderColumn>Availability</TableHeaderColumn>
                        <TableHeaderColumn>Total Downtime</TableHeaderColumn>
                        <TableHeaderColumn>Current Downtime</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                    <TableRow >
                        <TableRowColumn></TableRowColumn>
                        <TableRowColumn></TableRowColumn>
                        <TableRowColumn></TableRowColumn>
                        <TableRowColumn></TableRowColumn>
                    </TableRow>
                </TableBody>
            </Table>
        )
    }
}

export default TimelineTable;