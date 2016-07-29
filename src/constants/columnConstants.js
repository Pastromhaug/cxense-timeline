/**
 * Created by perandre on 6/14/16.
 */

export const COLUMNS = [
    {
        name: 'Name (Type)',
        jira_name: 'Name (Type)',
        field_name: 'name'
    },{
        name: 'ID',
        jira_name: 'ID',
        field_name: 'id',
        width: '100px'
    },{
        name: 'Status',
        jira_name: 'status',
        field_name: 'status',
        width: '50px'
    },{
        name: 'Rem Est',
        jira_name: 'Remaining Estimate',
        field_name: 'remaining_estimate',
        width: '50px'
    },{
        name: 'Planned Start',
        jira_name: 'Planned Start',
        field_name: 'start',
        width: '100px'
    },{
        name: 'Planned End',
        jira_name: 'Planned End',
        field_name: 'end',
        width: '100px'
    },{
        name: 'Planning Status',
        jira_name: 'Planning Status',
        field_name: 'planning_status'
    },{
        name: 'Reporter',
        field_name: 'reporter',
        width: '100px'
    },{
        name: 'Reporter Email',
        field_name: 'reporter_email',
        width: '150px'
    },{
        name: 'Created',
        field_name: 'created_at',
        width: '150px'
    },{
        name: 'Updated',
        field_name: 'updated_at',
        width: '150px'
    },{
        name: 'Priority',
        field_name: 'priority',
        width: '100px'
    },{
        name: 'Labels',
        field_name: 'labels',
    },{
        name: 'Security',
        field_name: 'security'
    },{
        name: 'Security Description',
        field_name: 'security_description'
    }
];

export const DEFAULT_COLUMNS = [
    'Name (Type)',
    'ID',
    'Status',
    'Rem Est',
    'Planned Start',
    'Planned End',
    'Planning Status'
];
