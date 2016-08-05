/**
 * Created by perandre on 05.08.16.
 */


import React from 'react';
import {colTable} from '../../styles/componentStyles';
import {Card} from 'material-ui/Card';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

const ColumnsList = (props) => {
    return(
        <Card style={colTable}>
            <div>
                <Table multiSelectable={true}
                       onCellClick={ (col_id) => {
                                    let col_name = props.columnNamesToDisplay[col_id];
                                    props.onCellClick(col_name);
                               }}>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn>Available</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody >
                        {props.columnNamesToDisplay.map((col) => (
                            <TableRow key={col} selected={props.toAddOrRemove.indexOf(col) != -1}>
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