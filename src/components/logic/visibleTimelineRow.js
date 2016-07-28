/**
 * Created by perandre on 6/16/16.
 */

import React from 'react';
import {connect} from 'react-redux';
import TimelineRow from '../presentation/timelineRow';

const mapStateToProps = (state) => {
    return {
        issues: state.issues,
        hover: state.table
    }
};

const VisibleTimelineRow = connect (
    mapStateToProps
)(TimelineRow);

export default VisibleTimelineRow
