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