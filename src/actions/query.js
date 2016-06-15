/**
 * Created by perandre on 6/14/16.
 */


export const TEMP_START_DATE = 'TEMP_START_DATE';
export function actionTempStartDate(start_date) {
    return {type: TEMP_START_DATE, start_date : start_date}
}

export const TEMP_END_DATE = 'TEMP_END_DATE';
export function actionTempEndDate(end_date) {
    return {type: TEMP_END_DATE, end_date: end_date}
}

export const TEMP_FIXED_OR_RELATIVE = 'FIXED_OR_RELATIVE';
export function actionTempFixedOrRelative(is_fixed) {
    return {type: TEMP_FIXED_OR_RELATIVE, is_fixed: is_fixed}
}

export const TEMP_START_DAY = 'TEMP_START_DAY';
export function actionTempStartDay(start_day) {
    return {type: TEMP_START_DAY, start_day: start_day}
}

export const TEMP_END_DAY = 'TEMP_END_DAY';
export function actionTempEndDay(end_day) {
    return {type: TEMP_END_DAY, end_day: end_day}
}

export const TEMP_QUERY = 'TEMP_QUERY';
export function actionTempQuery(temp_query) {
    return {type: TEMP_QUERY, temp_query: temp_query}
}

export const APPLY_QUERY = 'APPLY_QUERY';
export function actionApplyQuery() {
    return {type: APPLY_QUERY}
}



