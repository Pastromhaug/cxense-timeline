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
import VisibleQuery from './components/logic/visibleQuery';
import VisibleColumns from './components/logic/visibleColumns';
import mainReducer from './reducers/main';
import VisibleAppContent from './components/logic/visibleAppContent';
import VisibleSetIssuesSprintsQuarters from './components/logic/visibleSetIssuesSprintsQuarters';
import { syncHistoryWithStore } from 'react-router-redux';


require('./styles/general.css');



let store = createStore(mainReducer);



class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <MuiThemeProvider muiTheme={getMuiTheme()}>
                    <VisibleAppContent children={this.props.children}/>
                    <VisibleSetIssuesSprintsQuarters/>
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
                    <Route path="/query" component={VisibleQuery}/>
                    <Route path="/columns" component={VisibleColumns}/>
                </Route>
            </Router>
        )
    };
}

ReactDOM.render(<Routing/>, document.getElementById('main'));