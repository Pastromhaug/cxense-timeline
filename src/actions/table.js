/**
 * Created by perandre on 30.06.16.
 */

export const HOVER_ON_ISSUE = 'HOVER_ON_ISSUE';
export function actionHoverOnIssue(id) {
    return {type: HOVER_ON_ISSUE, id: id}
}