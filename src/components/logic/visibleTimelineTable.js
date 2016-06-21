/**
 * Created by perandre on 6/16/16.
 */

import React from 'react';
import {connect} from 'react-redux';
import TimelineTable from '../presentation/timelineTable';

const mapStateToProps = (state) => {
    return {
        columns: state.columns.columns,
        issues: state.issues,
        brush_start: state.brush.start_time,
        brush_end: state.brush.end_time
    }
};

const VisibleTimelineTable = connect (
    mapStateToProps
)(TimelineTable);

export default VisibleTimelineTable
