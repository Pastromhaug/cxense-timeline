/**
 * Created by perandre on 28.06.16.
 */

export const NEW_INTERVALS = 'NEW_INTERVALS';
export function actionNewIntervals(sprints, quarters) {
    return {type: NEW_INTERVALS, intervals: {sprints: sprints, quarters: quarters}}
}