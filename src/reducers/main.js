/**
 * Created by perandre on 6/14/16.
 */

import { combineReducers } from 'redux';
import query from './query';
import columns from './columns';
import table from './table';
import queryDialog from './queryDialog';
import chart from './chart';
import {routerReducer} from 'react-router-redux';

const mainReducer = combineReducers({
    query,
    columns,
    table,
    queryDialog,
    chart,
    routing: routerReducer
});

export default mainReducer
