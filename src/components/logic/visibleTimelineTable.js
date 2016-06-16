/**
 * Created by perandre on 6/16/16.
 */

import React from 'react';
import {connect} from 'react-redux';
import TimelineTable from '../presentation/timelineTable';

const mapStateToProps = (state) => {
    return {
        columns: state.columns.columns
    }
};

const VisibleTimelineTable = connect (
    mapStateToProps
)(TimelineTable);

export default VisibleTimelineTable
