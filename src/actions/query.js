/**
 * Created by perandre on 6/14/16.
 */

export const START_DATE = 'START_DATE';
export function actionStartDate(start_date) {
    return {type: START_DATE, start_date : start_date}
}

export const END_DATE = 'END_DATE';
export function actionEndDate(end_date) {
    return {type: END_DATE, end_date: end_date}
}

export const FIXED_OR_RELATIVE = 'FIXED_OR_RELATIVE';
export function actionFixedOrRelatie(is_fixed) {
    return {type: FIXED_OR_RELATIVE, is_fixed: is_fixed}
}

export const START_DAY = 'START_DAY';
export function actionStartDay(start_day) {
    return {type: START_DAY, start_day: start_day}
}

export const END_DAY = 'END_DAY';
export function actionEndDay(end_day) {
    return {type: END_DAY, end_day: end_day}
}

