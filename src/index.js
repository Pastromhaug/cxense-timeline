/**
 * Created by perandre on 2/23/16.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import Cards from './components/cards';
import VisibleQuery from './components/logic/visibleQuery';
import VisibleColumns from './components/logic/visibleColumns'
import AppBar from 'material-ui/AppBar';
import {appbarStyles, headerButton, headerTitle} from './styles/componentStyles';
import FlatButton from 'material-ui/FlatButton';
import mainReducer from './reducers/main'
require('./styles/general.css');



let store = createStore(mainReducer);



class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <MuiThemeProvider muiTheme={getMuiTheme()}>
                    <div>
                        <AppBar
                            showMenuIconButton={false}
                            style={appbarStyles.container}>

                            <Link className="MyLink" to="/timeline" >
                                <FlatButton style={headerButton.container}>Timeline</FlatButton>
                            </Link>

                            <Link className="MyLink" to="/query">
                                <FlatButton style={headerButton.container}>Edit Query</FlatButton>
                            </Link>

                            <Link className="MyLink" to="/columns" >
                                <FlatButton style={headerButton.container}>Configure Columns</FlatButton>
                            </Link>

                        </AppBar>
                        <div style={{padding: '16px'}}>
                            {this.props.children}
                        </div>
                    </div>
                </MuiThemeProvider>
            </Provider>
        )
    }
}

class Routing extends React.Component {
    render() {
        return (
            <Router history = {browserHistory}>
                <Route path="/" component = {App}>
                    <IndexRoute component={Cards}/>
                    <Route path="/timeline" component={Cards}/>
                    <Route path="/query" component={VisibleQuery}/>
                    <Route path="/columns" component={VisibleColumns}/>
                </Route>
            </Router>
        )
    };
}

ReactDOM.render(<Routing/>, document.getElementById('main'));