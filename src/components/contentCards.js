/**
 * Created by perandre on 5/2/16.
 */

import React from 'react';
import AppBar from 'material-ui/AppBar';
import {Card,CardHeader, CardTitle} from 'material-ui/Card';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';


const cardHeaderStyles = {
    container: {
        backgroundColor: 'rgb(232,232,232)'
    }
};

const cardStyles = {
    container: {
        margin: '16px'
    }
};

const appbarStyles = {
    container: {
        marginBottom: '32px',
        textAlign: 'center'
    }
};


const ContentCards = ({state, onAddAlert, onUpdateService}) => {

    return (
        <div>
            <AppBar
                title="Services Health Dashboard"
                showMenuIconButton={false}
                style={appbarStyles.container}
            />
            <Card style={cardStyles.container}>
                <CardHeader
                    title="Status of Services"
                    style={cardHeaderStyles.container}
                />
                <FlatButton label="Default" onClick={() => onUpdateService('hey2', "042342", "23%")} />
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderColumn>Service</TableHeaderColumn>
                            <TableHeaderColumn>Availability</TableHeaderColumn>
                            <TableHeaderColumn>Downtime</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {state.services.map( service =>
                            <TableRow key={service.service}>
                                <TableRowColumn>{service.service}</TableRowColumn>
                                <TableRowColumn>{service.availability}</TableRowColumn>
                                <TableRowColumn>{service.downtime}</TableRowColumn>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </Card>

            <Card style={cardStyles.container}>
                <CardHeader
                    title="Alerts"
                    style={cardHeaderStyles.container}
                />
                <FlatButton label="Default" onClick={() => onAddAlert('hey2')} />
                <List>
                    {state.alerts.map( alert =>
                        <ListItem primaryText={alert} key={alert}/>
                    )}
                </List>
            </Card>
        </div>
    )
};

export default ContentCards;

//<VisibleServicesTable/>
//<VisibleAlertsList/>