/**
 * Created by perandre on 6/14/16.
 */

import React from 'react';
import {cardStyles} from '../../styles/componentStyles';
import {Card} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import {colTable, colButton, applyColButton} from '../../styles/componentStyles';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {COLUMNS} from '../../constants/columnConstants';
import {Link} from 'react-router'

const Columns = ({columns_temp, to_add, to_remove, dispatchAddAllColumns,
        dispatchAddColumns, dispatchRemoveColumns, dispatchRemoveAllColumns,
        dispatchAddGroup, dispatchRemoveGroup, dispatchApplyColumns}) => {

    var available_cols = COLUMNS.filter( (col) => columns_temp.indexOf(col.name) == -1)
                                .map( (col) => col.name);

    return (
        <div
            style={{display: 'flex', justifyContent: 'center', marginLeft: 'auto', marginRight: 'auto', alignText: 'center'}}>
            <Card style={colTable}>
                <div>
                    <Table multiSelectable={true}
                           onCellClick={ (col_id) => {
                                let col_name = available_cols[col_id];
                                dispatchAddGroup(col_name);
                           }}>
                        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                            <TableRow>
                                <TableHeaderColumn>Available</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody >
                            {available_cols.map((col) => (
                                <TableRow key={col} selected={to_add.indexOf(col) != -1}>
                                    <TableRowColumn>{col}</TableRowColumn>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </Card>
            <div style={{ width: '250px', float: 'left', textAlign:'center'}}>
                <RaisedButton style={colButton} label="Add All"
                              onClick={ () => dispatchAddAllColumns()}/>
                <RaisedButton style={colButton} label="Add"
                              onClick={ () => dispatchAddColumns()}/>
                <RaisedButton style={colButton} label="Remove"
                              onClick={ () => dispatchRemoveColumns()}/>
                <RaisedButton style={colButton} label="Remove All"
                              onClick={ () => dispatchRemoveAllColumns()}/>
                <Link to="/timeline">
                    <RaisedButton style={colButton} label="Apply"
                                  onClick={ () => dispatchApplyColumns()}/>
                </Link>
            </div>
            <Card style={colTable}>
                <div>
                    <Table multiSelectable={true}
                           onCellClick={ (col_id) => {
                                let col_name = columns_temp[col_id];
                                dispatchRemoveGroup(col_name);
                           }}>
                        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                            <TableRow>
                                <TableHeaderColumn>Chosen</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody >
                            {columns_temp.map((col) => {
                                return(
                                <TableRow key={col} selected={to_remove.indexOf(col) != -1}>
                                    <TableRowColumn>{col}</TableRowColumn>
                                </TableRow>
                            )})}
                        </TableBody>
                    </Table>
                </div>
            </Card>
        </div>
    )
};


export default Columns;