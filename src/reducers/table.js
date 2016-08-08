/**
 * Created by perandre on 30.06.16.
 */
import {HOVER_ON_ISSUE} from '../actions/table';

// state here is the id of the issue that is being hovered on in the chart.
// purpose is to make the corresponding row in the table turn yellow

const table = (state = null, action) => {
    switch (action.type) {

        case HOVER_ON_ISSUE:
            return action.id;

        default:
            return state;
    }
};

export default table;
