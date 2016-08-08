/**
 * Created by perandre on 6/14/16.
 */

import {COLUMNS, DEFAULT_COLUMNS} from '../constants/columnConstants';
import {REMOVE_ALL_COLUMNS, ADD_ALL_COLUMNS,
        ADD_COLUMNS, REMOVE_COLUMNS,
        ADD_GROUP, REMOVE_GROUP, APPLY_COLUMNS,
        ADD_COLUMNS_CUSTOM} from '../actions/columns';


const initial_state = {
    columns_temp: DEFAULT_COLUMNS, // cols in the right side list on the columns page that haven't been applied yet
    to_add: [], // cols on the left list that are selected by the user
    to_remove: [], // cols on the right list that are selected by the user
    columns: DEFAULT_COLUMNS // columns that have been applied and are displaying in the table
};

const columns_temp = (state = initial_state, action) => {
    switch(action.type) {

        case REMOVE_ALL_COLUMNS:
            return Object.assign({}, state, {
                columns_temp: [],
                to_add: [],
                to_remove: [],
                columns: []
            });

        case REMOVE_COLUMNS:
            return Object.assign({}, state,
                {
                    columns_temp: state.columns_temp.filter( (col) => (
                        state.to_remove.indexOf(col) == -1)
                    ),
                    to_remove: []
                }
            );

        case ADD_COLUMNS:
            return Object.assign({}, state,
                {
                    columns_temp : state.columns_temp.concat(state.to_add),
                    to_add : []
                });

        case ADD_ALL_COLUMNS:
            return Object.assign({}, state, {
                columns_temp: COLUMNS.map( (col) => col.name),
                to_add: [],
                to_remove: []
            });

        case ADD_GROUP:
            var to_add;
            if (state.to_add.indexOf(action.col_name) == -1) {
                to_add = state.to_add.concat([action.col_name])
            }
            else {
                to_add = state.to_add.filter( (col_name) => col_name !== action.col_name)
            }
            return Object.assign({}, state,
                {
                    to_add: to_add
                }
            );

        case REMOVE_GROUP:
            var to_remove;
            if (state.to_remove.indexOf(action.col_name) == -1) {
                to_remove = state.to_remove.concat([action.col_name])
            }
            else {
                to_remove = state.to_remove.filter( (col_name) => col_name !== action.col_name)
            }
            return Object.assign({}, state,
                {
                    to_remove: to_remove
                }
            );

        case APPLY_COLUMNS:
            return Object.assign({}, state,
                {
                    columns : state.columns_temp
                });

        case ADD_COLUMNS_CUSTOM:
            return Object.assign({}, state,
                {
                    columns_temp: action.columns_list
                }
            );

        default:
            return state;
    }
};

export default columns_temp