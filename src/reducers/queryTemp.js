/**
 * Created by perandre on 6/14/16.
 */

import {TEMP_END_DATE, TEMP_START_DATE,
        TEMP_END_DAY, TEMP_START_DAY,
        TEMP_FIXED_OR_RELATIVE, TEMP_QUERY} from '../actions/queryTemp';

const start_date = new Date();
const end_date = new Date();
start_date.setFullYear(start_date.getFullYear() - 1);
start_date.setHours(0, 0, 0, 0);
end_date.setFullYear(end_date.getFullYear());
end_date.setHours(0, 0, 0, 0);

const initial_state = {
    start_date : start_date,
    end_date : end_date,
    is_fixed: true,
    start_day: 30,
    end_day: 0
};

const query_temp = (state = initial_state, action ) => {

    switch( action.type ) {

        case TEMP_START_DATE:
            console.log(action.start_date);
            return Object.assign({}, state, {start_date: action.start_date});
        case TEMP_END_DATE:
            return Object.assign({}, state, {end_date: action.end_date});
        case TEMP_FIXED_OR_RELATIVE:
            return Object.assign({}, state, {is_fixed: action.is_fixed});
        case TEMP_START_DAY:
            return Object.assign({}, state, {start_day: action.start_day});
        case TEMP_END_DAY:
            return Object.assign({}, state, {end_day: action.end_day});
        case TEMP_QUERY:
            return Object.assign({}, state, {temp_query: action.temp_query});
        default:
            return state
    }
};

export default query_temp