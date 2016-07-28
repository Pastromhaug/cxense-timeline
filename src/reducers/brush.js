/**
 * Created by perandre on 6/21/16.
 */

import {BRUSH_INTERVAL} from '../actions/issues';

const initial_state = {
    start_time: 0,
    end_time: 0
};

const brush = (state = initial_state, action) => {
    switch (action.type) {

        case BRUSH_INTERVAL:
            return Object.assign({}, state, {
                start_time: action.start_time,
                end_time: action.end_time
            });
        default:
            return state;
    }
};

export default brush;
