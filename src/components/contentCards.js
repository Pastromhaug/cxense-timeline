/**
 * Created by perandre on 5/2/16.
 */

import React from 'react';
import AppBar from 'material-ui/AppBar';
import {Card,CardHeader, CardTitle} from 'material-ui/Card';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';
import $ from 'jquery';

var socket = io();


const cardHeaderStyles = {
    container: {
        backgroundColor: 'rgb(232,232,232)'
    }
};

const cardStyles = {
    container: {
        margin: '16px',
        marginBottom: '32px'
    }
};

const appbarStyles = {
    container: {
        marginBottom: '48px',
        textAlign: 'center',
        backgroundColor: '#A8A8A8'
    }
};


class ContentCards extends React.Component {

    constructor(props) {
        super(props);
        socket.emit('client event', {first: 'clientevent'});
        socket.on('init alerts', (data) => {
            for (var i = 0; i < data.alerts.length; i++) {
                var newAlert = data.alerts[i];
                newAlert['username'] = newAlert['source'];
                const newAlert = {alert: newAlert, action: 'Create'};
                props.onAddAlert(newAlert);
            }
            socket.on('server event', (data) => {
                props.onAddAlert(data);
            });
            socket.on('update alert', (data) => {
                console.log('update alert data:');
                console.log(data);
                props.onUpdateAlert(data);
            });
        });

    }

    render() {
        let {_state, onAddAlert, onUpdateService, onUpdateAlert} = this.props;
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
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHeaderColumn>Service</TableHeaderColumn>
                                <TableHeaderColumn>Availability</TableHeaderColumn>
                                <TableHeaderColumn>Downtime</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {_state.services.map(service =>
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
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHeaderColumn>Service</TableHeaderColumn>
                                <TableHeaderColumn>User</TableHeaderColumn>
                                <TableHeaderColumn>Message</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {_state.alerts.map(_alert =>
                                <TableRow>
                                    <TableRowColumn>{_alert.alert.status}</TableRowColumn>
                                    <TableRowColumn>{_alert.alert.username}</TableRowColumn>
                                    <TableRowColumn>{_alert.alert.message}</TableRowColumn>
                                </TableRow>)
                            }
                        </TableBody>
                    </Table>
                </Card>
            </div>
        )
    }
}


export default ContentCards;
