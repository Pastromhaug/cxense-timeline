
export const ADD_ISSUES = 'ADD_ISSUES';
export function actionAddIssues(issues) {
    return {type: ADD_ISSUES, issues: issues}
}

export const BRUSH_INTERVAL = 'START_BRUSH';
export function actionBrushInterval(start_time, end_time) {
    return {type: BRUSH_INTERVAL, start_time: start_time, end_time: end_time}
}
