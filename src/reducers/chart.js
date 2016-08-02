/**
 * Created by perandre on 02.08.16.
 */


import {SET_ALL_CHART_STATE} from '../actions/chart';
var moment = require('moment');

const initial_state = {
    issues: [],
    sprints: [],
    quarters: [],
    timeBegin: moment.utc().valueOf(),
    timeEnd: moment.utc().valueOf()
};


const chart = (state = initial_state, action) => {
    switch (action.type) {

        case SET_ALL_CHART_STATE:
            return Object.assign({}, state, action.chart_state);
        default:
            return state;
    }
};

export default chart;