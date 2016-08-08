/**
 * Created by perandre on 6/13/16.
 */

import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow} from 'material-ui/Table';
import AppTableRow from './appTableRow';
import {COLUMNS} from '../../constants/columnConstants';
import {connect} from 'react-redux';
var moment = require('moment');


/**
 * This component is the table that is displayed below the chart in the /timeline/:query route
 */

class _AppTable extends React.Component {

    render() {
        // this.props.columns only contains column names, but COLUMNS contains all the info needed
        // on each column. So we filter COLUMNS for the column names in this.props.columns
        // to get all the info we need.
        var col_info = COLUMNS.filter( (COL) => this.props.columns.indexOf(COL.name) !== -1);
        return (
            <Table>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                    <TableRow>
                        {/*For each column in col_in col_info, add the header column*/}
                        {col_info.map( (col) => {
                            let colStyle = {};
                            // some columns have their width specified in pixels b/c they're really short
                            // and I don't want them wasting too much space
                            if (_.has(col, 'width')) {
                                colStyle.width = col.width;
                            }
                            return <TableHeaderColumn key={col.name}
                                                      style={colStyle}>{col.name}</TableHeaderColumn>
                        })}
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                    {/*Add a row to the table body for each of the issues*/}
                    {this.props.issues.map( (issue) =>
                        <AppTableRow key={moment.utc().valueOf() + issue.name}
                                     col_info={col_info} issue={issue} />)}
                </TableBody>
            </Table>
        )
    }
}



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