/**
 * Created by perandre on 02.08.16.
 */

export const SET_ALL_CHART_STATE = 'SET_ALL_CHART_STATE';
export function actionSetAllChartState(issues, sprints, quarters, timeBegin, timeEnd) {
    return {type: SET_ALL_CHART_STATE, chart_state: {
        issues: issues,
        sprints: sprints,
        quarters: quarters,
        timeBegin: timeBegin,
        timeEnd: timeEnd
    }}
}