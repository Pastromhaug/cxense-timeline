/**
 * Created by perandre on 6/14/16.
 */

export const REMOVE_ALL_COLUMNS = 'REMOVE_ALL COLUMNS';
export function actionRemoveAllColumns() {
    return( {type: REMOVE_ALL_COLUMNS})
}

export const REMOVE_COLUMN = 'REMOVE COLUMN';
export function actionRemoveColumn(col_name) {
    return( {type: REMOVE_COLUMN, col_name: col_name})
}

export const ADD_COLUMN = 'ADD_COLUMN';
export function actionAddColumn(col_name) {
    return( {type: ADD_COLUMN, col_name: col_name})
}

export const ADD_ALL_COLUMNS = 'ADD_ALL_COLUMNS';
export function actionAddAllColumns() {
    return( {type: ADD_ALL_COLUMNS})
}