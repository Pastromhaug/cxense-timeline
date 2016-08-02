/**
 * Created by perandre on 6/14/16.
 */

export const TEMP_QUERY = 'TEMP_QUERY';
export function actionTempQuery(temp_query) {
    return {type: TEMP_QUERY, temp_query: temp_query}
}

export const APPLY_QUERY = 'APPLY_QUERY';
export function actionApplyQuery() {
    return {type: APPLY_QUERY}
}

export const CANCEL_QUERY = 'CANCEL_QUERY';
export function actionCancelQuery() {
    return {type: CANCEL_QUERY}
}

export const APPLY_QUERY_CUSTOM = 'APPLY_QUERY_CUSTOM';
export function actionApplyQueryCustom(query) {
    return {type: APPLY_QUERY_CUSTOM, query: query}
}



