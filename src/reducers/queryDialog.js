/**
 * Created by perandre on 25.07.16.
 */


import {OPEN_QUERY_DIALOG, CLOSE_QUERY_DIALOG,
    SET_QUERY_NAME, SET_SAVED_QUERIES} from '../actions/queryDialog';

const initial_state = {
    open: false,
    name: "",
    saved_queries: []
};

const queryDialog = (state = initial_state, action) => {
    switch (action.type) {

        case OPEN_QUERY_DIALOG:
            return Object.assign({},state, {open: true});
        case CLOSE_QUERY_DIALOG:
            return Object.assign({},state, {open: false});
        case SET_QUERY_NAME:
            return Object.assign({},state, {name: action.name});
        case SET_SAVED_QUERIES:
            return Object.assign({},state, {saved_queries: action.queries});
        default:
            return state;
    }
};

export default queryDialog;
