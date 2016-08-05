/**
 * Created by perandre on 6/13/16.
 */

import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow} from 'material-ui/Table';
import AppTableRow from './appTableRow';
import {COLUMNS} from '../../constants/columnConstants';
import {connect} from 'react-redux';
var moment = require('moment');


class _AppTable extends React.Component {

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
                    {this.props.issues.map( (issue) => <AppTableRow key={moment.utc().valueOf() + issue.name}
                                                                           col_info={col_info} issue={issue} />)}
                </TableBody>
            </Table>
        )
    }

};



const mapStateToProps = (state) => {
    return {
        columns: state.columns.columns,
        issues: state.chart.issues
    }
};

const AppTable = connect (
    mapStateToProps
)(_AppTable);

export default AppTable;