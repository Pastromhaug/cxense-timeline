/**
 * Created by perandre on 28.06.16.
 */

import {NEW_INTERVALS} from '../actions/timeIntervals';

const initial_state = {
    sprints: [],
    quarters: []
};

const timeIntervals = (state = initial_state, action) => {
    switch (action.type) {

        case NEW_INTERVALS:
            return Object.assign({}, state,  action.intervals);

        default:
            return state;
    }
};

export default timeIntervals;
