
export const ADD_ISSUES = 'ADD_ISSUES';
export function actionAddIssues(issues) {
    return {type: ADD_ISSUES, issues: issues}
}
