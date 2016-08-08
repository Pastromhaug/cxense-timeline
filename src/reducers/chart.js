/**
 * Created by perandre on 02.08.16.
 */


import {SET_ALL_CHART_STATE} from '../actions/chart';
var moment = require('moment');

const initial_state = {
    issues: [], // array of jsons containing information about each issue
    sprints: [], // array of jsons containing date ranges for all the sprints that overlap with timeBegin - timeEnd
    quarters: [], // array of jsons containing date ranges for all the quarters that overlap with timeBegin - timeEnd
    timeBegin: moment.utc().valueOf(), // the earliest time to be displayed in the svg
    timeEnd: moment.utc().valueOf() // the latest time to be displayed in the svg
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