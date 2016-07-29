/**
 * Created by perandre on 6/13/16.
 */

import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import VisibleTimelineRow from '../logic/visibleTimelineRow';
import {COLUMNS} from '../../constants/columnConstants';
var moment = require('moment');


class TimelineTable extends React.Component {

    render() {
        var col_info = COLUMNS.filter( (COL) => this.props.columns.indexOf(COL.name) !== -1);
        return (
            <Table>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                    <TableRow>
                        {col_info.map( (col) => {
                            let colStyle = {};
                            if (_.has(col, 'width')) {
                                colStyle.width = col.width;
                            }
                            return <TableHeaderColumn key={col.name}
                                style={colStyle}>{col.name}</TableHeaderColumn>
                        })}
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                    {this.props.issues.map( (issue) => <VisibleTimelineRow key={moment.utc().valueOf() + issue.name}
                                                                           col_info={col_info} issue={issue} />)}
                </TableBody>
            </Table>
        )
    }

};



export default TimelineTable;