/**
 * Created by perandre on 25.07.16.
 */


import {OPEN_QUERY_DIALOG, CLOSE_QUERY_DIALOG} from '../actions/queryDialog';

const initial_state = {open: false}

const queryDialog = (state = initial_state, action) => {
    switch (action.type) {

        case OPEN_QUERY_DIALOG:
            return {open: true};
        case CLOSE_QUERY_DIALOG:
            return {open: false};
        default:
            return state;
    }
};

export default queryDialog;
