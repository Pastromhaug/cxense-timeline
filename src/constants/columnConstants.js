/**
 * Created by perandre on 6/14/16.
 *
 * These are all of the columns that are available for viewing in the table, and
 * can be selected at the /columns route.
 *
 * name: the string displayed as the title of the column in the table
 * field_name: the name of the json field holding the information in the issues array
 * width: some columns don't take up much space, so I restrict their width
 */

export const COLUMNS = [
    {
        name: 'Name (Type)',
        field_name: 'name'
    },{
        name: 'ID',
        field_name: 'id',
        width: '100px'
    },{
        name: 'Status',
        field_name: 'status',
        width: '50px'
    },{
        name: 'Rem Est',
        field_name: 'remaining_estimate',
        width: '50px'
    },{
        name: 'Planned Start',
        field_name: 'start',
        width: '100px'
    },{
        name: 'Planned End',
        field_name: 'end',
        width: '100px'
    },{
        name: 'Planning Status',
        field_name: 'planning_status',
        width: '200px'
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
    // 'Name (Type)',
    // 'ID',
    // 'Status',
    // 'Rem Est',
    // 'Planned Start',
    // 'Planned End',
    // 'Planning Status'
];
