/**
 * Created by perandre on 05.08.16.
 */


import React from 'react';
import {colTable} from '../../styles/componentStyles';
import {Card} from 'material-ui/Card';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';


/**
 * A List (of columns) that will be extended by the classes 'ColumnsAvailableList'
 * and 'ColumnsSelectedList'. Takes three arguments:
 * @columnNamesToDisplay [String] - the list of column names that should be displayed
 * in the list
 * @onCellClick function - the function to be called when a row is clicked.
 * Takes a column name as the argument
 * @toAddOrRemove [String] - An array of strings representing the columns that should be
 * 'selected' in the list of columns. The 'selected' columns in this context are the columns
 * that the user has click the checkbox on. When the user selects the 'ADD' or 'REMOVE' buttons
 * the columns in this array are added to the other list
 */

const ColumnsList = ({columnNamesToDisplay, toAddOrRemove, onCellClick}) => {
    return(
        <Card style={colTable}>
            <div>
                <Table multiSelectable={true}
                       onCellClick={ (col_id) => {
                                    let col_name = columnNamesToDisplay[col_id];
                                    onCellClick(col_name);
                               }}>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn>Available</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody >
                        {columnNamesToDisplay.map((col) => (
                            <TableRow key={col} selected={toAddOrRemove.indexOf(col) != -1}>
                                <TableRowColumn>{col}</TableRowColumn>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </Card>
    )
};

export default ColumnsList;