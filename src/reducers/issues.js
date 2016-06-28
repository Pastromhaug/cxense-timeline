import {ADD_ISSUES, REPLACE_ISSUES} from '../actions/issues';
var _ = require('lodash');

const issues = (state = [], action) => {
    switch (action.type) {

        case ADD_ISSUES:
            console.log('ADD_ISSUES');
            return _.unionBy(state, action.issues, (d) => d.id);

        case REPLACE_ISSUES:
            console.log('REPLACE_ISSUES');
            return action.issues;

        default:
            return state;
    }
};

export default issues;
