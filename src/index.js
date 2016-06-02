/**
 * Created by perandre on 2/23/16.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Router, Route, Link, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import mainReducer from './reducers/index'
// Components
import VisibleContentCards from './components/visibleContentCards';
require('./styles/general.css');



let store = createStore(mainReducer);


class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <MuiThemeProvider muiTheme={getMuiTheme()}>
                    <VisibleContentCards/>
                </MuiThemeProvider>
            </Provider>
        )
    }
}

class Routing extends React.Component {
    render() {
        return (
            <Router history = {browserHistory}>
                <Route path="/" component = {App}/>
            </Router>
        )
    };
}

ReactDOM.render(<Routing/>, document.getElementById('main'));

//<ContentCards/>