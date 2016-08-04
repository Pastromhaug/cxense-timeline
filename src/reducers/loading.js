/**
 * Created by perandre on 04.08.16.
 */


import {LOADING_START, LOADING_STOP} from '../actions/loading';

const initial_state = true;

function loading(state = initial_state, action) {
    switch (action.type) {
        case LOADING_START:
            return true;
        case LOADING_STOP:
            return false;
        default:
            return state;
    }
}

export default loading;