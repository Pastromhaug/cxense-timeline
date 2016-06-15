/**
 * Created by perandre on 6/14/16.
 */

import React from 'react';
import {cardStyles} from '../../styles/componentStyles';
import {Card} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import {colTable, colButton} from '../../styles/componentStyles';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {COLUMNS} from '../../constants/constants';

const Columns = ({columns_temp, dispatchAddAllColumns,
    dispatchAddColumn, dispatchRemoveColumn, dispatchRemoveAllColumns}) => (

    <div style={{display: 'flex', justifyContent: 'center', marginLeft: 'auto', marginRight: 'auto', alignText: 'center'}}>
        <Card style={cardStyles.container} style={colTable} >
            <Table multiSelectable={true}>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                    <TableRow>
                        <TableHeaderColumn>Available</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody >
                    {COLUMNS.filter( (col) => columns_temp.indexOf(col.name) == -1)
                        .map( (col) => (
                            <TableRow key={col.name}>
                                <TableRowColumn>{col.name}</TableRowColumn>
                            </TableRow>
                            )
                        )
                    }
                </TableBody>
            </Table>
        </Card>
        <div style={{ width: '250px', float: 'left', textAlign:'center'}}>
            <RaisedButton style={colButton} label="Add All"
                onClick={ () => dispatchAddAllColumns()}
            />
            <RaisedButton style={colButton} label="Add"/>
            <RaisedButton style={colButton} label="Remove"/>
            <RaisedButton style={colButton} label="Remove All"
                onClick={ () => dispatchRemoveAllColumns()}
            />
        </div>
        <Card style={cardStyles.container} style={colTable} >
            <Table multiSelectable={true}>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                    <TableRow>
                        <TableHeaderColumn>Chosen</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody >
                    {columns_temp.map( (col) => (
                        <TableRow key={col}>
                            <TableRowColumn>{col}</TableRowColumn>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Card>
    </div>
);


export default Columns;