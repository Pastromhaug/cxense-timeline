/**
 * Created by perandre on 6/14/16.
 */

import {TEMP_END_DATE, TEMP_START_DATE,
        TEMP_END_DAY, TEMP_START_DAY,
        TEMP_FIXED_OR_RELATIVE, TEMP_QUERY,
        APPLY_QUERY, CANCEL_QUERY} from '../actions/query';

const start_date = new Date();
const end_date = new Date();
start_date.setFullYear(start_date.getFullYear() - 1);
start_date.setHours(0, 0, 0, 0);
end_date.setFullYear(end_date.getFullYear());
end_date.setHours(0, 0, 0, 0);

const initial_state = {
    query_temp: {
        start_date: start_date,
        end_date: end_date,
        is_fixed: true,
        start_day: 30,
        end_day: 0,
        query: 'http://localhost:8001/sample'
    },
    query: {
        start_date: start_date,
        end_date: end_date,
        is_fixed: true,
        start_day: 30,
        end_day: 0,
        query: 'http://localhost:8001/sample'
    }
};

const query_temp = (state = initial_state, action ) => {

    switch( action.type ) {

        case TEMP_START_DATE:
            console.log(action.start_date);
            return Object.assign({}, state, {
                query_temp: Object.assign({}, state.query_temp, {start_date: action.start_date})
            });

        case TEMP_END_DATE:
            console.log(action.end_date);
            return Object.assign({}, state, {
                query_temp: Object.assign({}, state.query_temp, {end_date: action.end_date})
            });

        case TEMP_FIXED_OR_RELATIVE:
            let is_fixed = true;
            if (action.is_fixed == 'not_light') is_fixed = false;
            console.log(is_fixed);
            return Object.assign({}, state, {
                query_temp: Object.assign({}, state.query_temp, {is_fixed: is_fixed})
            });

        case TEMP_START_DAY:
            console.log(action.start_day);
            return Object.assign({}, state, {
                query_temp: Object.assign({}, state.query_temp, {start_day: action.start_day})
            });

        case TEMP_END_DAY:
            console.log(action.end_day);
            return Object.assign({}, state, {
                query_temp: Object.assign({}, state.query_temp, {end_day: action.end_day})
            });

        case TEMP_QUERY:
            console.log(action.temp_query);
            return Object.assign({}, state, {
                query_temp: Object.assign({}, state.query_temp, {query: action.temp_query})
            });

        case APPLY_QUERY:
            console.log('APPLY QUERY');
            console.log(state.query_temp);
            return Object.assign({}, state, {query: state.query_temp});

        case CANCEL_QUERY:
            console.log('CANCEL_QUERY');
            return Object.assign({}, state, {query_temp: state.query});

        default:
            return state
    }
};

export default query_temp