import {ADD_ISSUES} from '../actions/issues';

const issues = (state = [], action) => {
    switch (action.type) {

        case ADD_ISSUES:
            return state.concat(action.issues);
        default:
            return state;
    }
}

export default issues;
