/**
 * Created by perandre on 6/14/16.
 */

import { combineReducers } from 'redux';
import query from './query';
import query_temp from './queryTemp';
import columns_temp from './columns_temp';

const mainReducer = combineReducers({
    query,
    query_temp,
    columns_temp
});

export default mainReducer