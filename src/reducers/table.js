/**
 * Created by perandre on 30.06.16.
 */
import {HOVER_ON_ISSUE} from '../actions/table';

const table = (state = null, action) => {
    switch (action.type) {

        case HOVER_ON_ISSUE:
            return action.id;

        default:
            return state;
    }
};

export default table;
