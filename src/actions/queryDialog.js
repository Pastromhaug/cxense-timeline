/**
 * Created by perandre on 25.07.16.
 */

export const OPEN_QUERY_DIALOG = 'OPEN_QUERY_DIALOG';
export function actionOpenQueryDialog() {
    return {type: OPEN_QUERY_DIALOG}
}

export const CLOSE_QUERY_DIALOG = 'CLOSE_QUERY_DIALOG';
export function actionCloseQueryDialog() {
    return {type: CLOSE_QUERY_DIALOG}
}

export const SET_QUERY_NAME = 'SET_QUERY_NAME';
export function actionSetQueryName(name) {
    return {type: SET_QUERY_NAME, name: name}
}

export const SET_SAVED_QUERIES = 'SET_SAVED_QUERIES';
export function actionSetSavedQueries(queries) {
    return {type: SET_SAVED_QUERIES, queries: queries}
}