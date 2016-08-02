/**
 * Created by perandre on 6/14/16.
 */

import { TEMP_QUERY, APPLY_QUERY, CANCEL_QUERY,
        APPLY_QUERY_CUSTOM} from '../actions/query';

const start_date = new Date();
const end_date = new Date();
start_date.setFullYear(start_date.getFullYear() - 1);
start_date.setHours(0, 0, 0, 0);
end_date.setFullYear(end_date.getFullYear());
end_date.setHours(0, 0, 0, 0);

const initial_state = {
    query_temp: {
        query: 'project IN (CXANA) AND issuetype = epic &startAt=0&maxResults=1000'// AND status in (resolved)&fields=id,key,status,project&maxResults=5'
    },
    query: {
        query: ''
    }
};

const query_temp = (state = initial_state, action ) => {

    switch( action.type ) {

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
            return Object.assign({}, state, {query: Object.assign({},
                state.query, {query: action.query})});

        default:
            return state
    }
};

export default query_temp