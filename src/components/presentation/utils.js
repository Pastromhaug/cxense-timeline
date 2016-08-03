/**
 * Created by perandre on 02.08.16.
 */
import {COLORS} from '../../constants/colorCode';
var moment = require('moment');
var d3 = require('d3');


export default class Utils {
    
    static timeBegin(issues) {
        var min = d3.min(issues, (issue) => issue.start);
        min = Math.min(min, moment.utc().valueOf());
        var max = d3.max(issues, (issue) => issue.end);
        return min - (max - min)/20;
    }


    static timeEnd(issues) {
        var max = d3.max(issues, (issue) => issue.end);
        max = Math.max(max, moment.utc().valueOf());
        var min = d3.min(issues, (issue) => issue.start);
        return max + (max - min)/20;
    }


    static getColors(issue) {
        var status1 = ['Resolved', 'Closed'];
        var group1 = ['None', 'Not started' + 'Functional spec in progress'];
        var group2 = ['Functional spec done', 'Dev plan in progress'];
        if (status1.indexOf(issue.status) != -1 && issue.resolution === 'Fixed') {
            return COLORS.a;
        }
        else if (status1.indexOf(issue.status) != -1 && issue.resolution === "Won't Fix") {
            return COLORS.b;
        }
        else if (status1.indexOf(issue.status) == -1 &&
            (group1.indexOf(issue.resolution) != -1 || group1.indexOf(issue.resolution2) != -1)) {
            return COLORS.c;
        }
        else if (status1.indexOf(issue.status) == -1 &&
            (group2.indexOf(issue.resolution) != -1 || group2.indexOf(issue.resolution2) != -1)) {
            return COLORS.d;
        }
        else if (status1.indexOf(issue.status) == -1 &&
            (issue.resolution === 'Ready for coding' || issue.resolution2 === 'Ready for coding')) {
            return COLORS.e;
        }
        else if (status1.indexOf(issue.status) == -1 &&
            (issue.resolution === 'N/A' || issue.resolution2 === 'N/A')) {
            return COLORS.f;
        }
        else return COLORS.g;
    }

    static openIssueInNewTab(issueId){
        window.open("https://jira.cxense.com/browse/" + issueId,'_blank');
    }

}