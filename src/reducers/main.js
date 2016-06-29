/**
 * Created by perandre on 6/14/16.
 */

import { combineReducers } from 'redux';
import query from './query';
import columns from './columns';
import issues from './issues';
import brush from './brush';
import timeIntervals from './timeIntervals';
import {routerReducer} from 'react-router-redux';

const mainReducer = combineReducers({
    query,
    columns,
    issues,
    brush,
    timeIntervals,
    routing: routerReducer
});

export default mainReducer
