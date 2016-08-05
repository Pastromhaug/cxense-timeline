/**
 * Created by perandre on 2/23/16.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Cards from './components/presentation/cards';
import Query from './components/presentation/query';
import Columns from './components/presentation/columns';
import mainReducer from './reducers/main';
import AppContent from './components/presentation/appContent';
import ChartStateController from './components/presentation/chartStateController';
import ColumnsStateController from './components/presentation/columnStateController';
import { syncHistoryWithStore } from 'react-router-redux';

var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

require('./styles/general.css');



let store = createStore(mainReducer);



class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <MuiThemeProvider muiTheme={getMuiTheme()}>
                    <div>
                        <AppContent children={this.props.children}/>
                        <ChartStateController/>
                        <ColumnsStateController/>
                    </div>
                </MuiThemeProvider>
            </Provider>
        )
    }
}

const history = syncHistoryWithStore(browserHistory, store);

class Routing extends React.Component {
    render() {
        return (
            <Router history = {history}>
                <Route path="/" component = {App}>
                    <IndexRoute component={Cards}/>
                    <Route path="/timeline/:query" component={Cards}/>
                    <Route path="/query" component={Query}/>
                    <Route path="/columns" component={Columns}/>
                </Route>
            </Router>
        )
    };
}

ReactDOM.render(<Routing/>, document.getElementById('main'));