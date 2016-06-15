/**
 * Created by perandre on 6/14/16.
 */

export const REMOVE_ALL_COLUMNS = 'REMOVE_ALL COLUMNS';
export function actionRemoveAllColumns() {
    return( {type: REMOVE_ALL_COLUMNS})
}

export const REMOVE_COLUMNS = 'REMOVE COLUMNS';
export function actionRemoveColumns() {
    return( {type: REMOVE_COLUMNS})
}

export const ADD_COLUMNS = 'ADD_COLUMNS';
export function actionAddColumns() {
    return( {type: ADD_COLUMNS})
}

export const ADD_ALL_COLUMNS = 'ADD_ALL_COLUMNS';
export function actionAddAllColumns() {
    return( {type: ADD_ALL_COLUMNS})
}

export const ADD_GROUP = 'ADD_GROUP';
export function actionAddGroup(col_name) {
    return( {type: ADD_GROUP, col_name: col_name})
}

export const REMOVE_GROUP = 'REMOVE_GROUP';
export function actionRemoveGroup(col_name) {
    return( {type: REMOVE_GROUP, col_name: col_name})
}

export const APPLY_COLUMNS = 'APPLY_COLUMNS';
export function actionApplyColumns() {
    return( {type: APPLY_COLUMNS})
}