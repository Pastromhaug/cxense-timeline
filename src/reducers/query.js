/**
 * Created by perandre on 6/14/16.
 */

import {CHANGE_END_DATE, CHANGE_START_DATE} from '../actions/query';

const start_date = new Date();
const end_date = new Date();
start_date.setFullYear(start_date.getFullYear() - 1);
start_date.setHours(0, 0, 0, 0);
end_date.setFullYear(end_date.getFullYear() + 1);
end_date.setHours(0, 0, 0, 0);

const initial_state = {
    start_date : start_date,
    end_date : end_date
};

const query = (state = initial_state, action ) => {

    switch( action.type ) {

        case CHANGE_START_DATE:
            return Object.assign({}, state, {start_date: action.start_date});
        case CHANGE_END_DATE:
            return Object.assign({}, state, {end_date: action.end_date});
        default:
            return state
    }
};

export default query