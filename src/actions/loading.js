/**
 * Created by perandre on 04.08.16.
 */

export const LOADING_START = 'LOADING_START';
export function actionLoadingStart() {
    return {type: LOADING_START}
}

export const LOADING_STOP = 'LOADING_STOP';
export function actionLoadingStop() {
    return {type: LOADING_STOP}
}