/**
 * Created by perandre on 6/14/16.
 */

import {TEMP_END_DATE, TEMP_START_DATE,
        TEMP_END_DAY, TEMP_START_DAY,
        TEMP_FIXED_OR_RELATIVE, TEMP_QUERY,
        APPLY_QUERY, CANCEL_QUERY,
        APPLY_QUERY_CUSTOM} from '../actions/query';

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
        query: 'project IN (CXANA) AND issuetype = epic &startAt=0&maxResults=1000'// AND status in (resolved)&fields=id,key,status,project&maxResults=5'
    },
    query: {
        start_date: start_date,
        end_date: end_date,
        is_fixed: true,
        start_day: 30,
        end_day: 0,
        query: ''
    }
};

const query_temp = (state = initial_state, action ) => {

    switch( action.type ) {

        case TEMP_START_DATE:
            return Object.assign({}, state, {
                query_temp: Object.assign({}, state.query_temp, {start_date: action.start_date})
            });

        case TEMP_END_DATE:
            return Object.assign({}, state, {
                query_temp: Object.assign({}, state.query_temp, {end_date: action.end_date})
            });

        case TEMP_FIXED_OR_RELATIVE:
            let is_fixed = true;
            if (action.is_fixed == 'not_light') is_fixed = false;
            return Object.assign({}, state, {
                query_temp: Object.assign({}, state.query_temp, {is_fixed: is_fixed})
            });

        case TEMP_START_DAY:
            return Object.assign({}, state, {
                query_temp: Object.assign({}, state.query_temp, {start_day: action.start_day})
            });

        case TEMP_END_DAY:
            return Object.assign({}, state, {
                query_temp: Object.assign({}, state.query_temp, {end_day: action.end_day})
            });

        case TEMP_QUERY:
            return Object.assign({}, state, {
                query_temp: Object.assign({}, state.query_temp, {query: action.temp_query})
            });

        case APPLY_QUERY:
            return Object.assign({}, state, {query: state.query_temp});

        case CANCEL_QUERY:
            return Object.assign({}, state, {query_temp: state.query});

        case APPLY_QUERY_CUSTOM:
            var newstate = Object.assign({}, state, {query: Object.assign({},
            state.query, {query: action.query})});
            console.log('new state query: ');
            console.log(newstate.query.query);
            return Object.assign({}, state, {query: Object.assign({},
                state.query, {query: action.query})});

        default:
            return state
    }
};

export default query_temp