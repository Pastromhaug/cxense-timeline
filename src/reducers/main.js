/**
 * Created by perandre on 6/14/16.
 */

import { combineReducers } from 'redux';
import query from './query';
import columns from './columns';

const mainReducer = combineReducers({
    query,
    columns
});

export default mainReducer