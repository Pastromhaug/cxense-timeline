import {ADD_ISSUES} from '../actions/issues';

const issues = (state = [], action) => {
    switch (action.type) {

        case ADD_ISSUES:
            console.log('ADD_ISSUES: ')
            console.log(action.issues);
            return state.concat(action.issues);
        default:
            return state;
    }
}

export default issues;
