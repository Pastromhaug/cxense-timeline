/**
 * Created by perandre on 6/14/16.
 */

import {COLUMNS, DEFAULT_COLUMNS} from '../constants/constants';
import {REMOVE_ALL_COLUMNS, ADD_ALL_COLUMNS,
            ADD_COLUMN REMOVE_COLUMN} from '../actions/columnsTemp';


const columns_temp = (state = DEFAULT_COLUMNS, action) => {
    switch(action.type) {
        case REMOVE_ALL_COLUMNS:
            return [];
        case REMOVE_COLUMN:
            return state.filter( (col) => col.name !== action.col_name);
        case ADD_COLUMN:
            let new_col = COLUMNS.filter( (col) => col.name === action.col_name)[0];
            return state.concat(new_col);
        case ADD_ALL_COLUMNS:
            return COLUMNS;
        default:
            return state;
    }
};

export default columns_temp