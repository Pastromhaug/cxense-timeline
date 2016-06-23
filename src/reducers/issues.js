import {ADD_ISSUES} from '../actions/issues';
var _ = require('lodash');

const issues = (state = [], action) => {
    switch (action.type) {

        case ADD_ISSUES:
            console.log('ADD_ISSUES');
            return _.unionBy(state, action.issues, (d) => d.id);
        default:
            return state;
    }
};

export default issues;
