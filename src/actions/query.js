/**
 * Created by perandre on 6/14/16.
 */

export const CHANGE_START_DATE = 'CHANGE_START_DATE';
export function actionChangeStartDate(start_date) {
    return {type: CHANGE_START_DATE, start_date : start_date}
}

export const CHANGE_END_DATE = 'CHANGE_END_DATE';
export function actionChangeEndDate(end_date) {
    return {type: CHANGE_END_DATE, end_date: end_date}
}


export const CHANGE_TEMP_START_DATE = 'CHANGE_TEMP_START_DATE';
export function actionChangeTempStartDate(start_date) {
    return {type: CHANGE_TEMP_START_DATE, start_date : start_date}
}

export const CHANGE_TEMP_END_DATE = 'CHANGE_TEMP_END_DATE';
export function actionChangeTempEndDate(end_date) {
    return {type: CHANGE_TEMP_END_DATE, end_date: end_date}
}


