/**
 * Created by perandre on 6/23/16.
 */

import React from 'react';
import { connect } from 'react-redux';
import AppContent from '../presentation/appContent';

const mapStateToProps = (state) => {
    return {
        query: state.query.query.query
    }
};

const VisibleAppContent = connect (
    mapStateToProps
)(AppContent);

export default VisibleAppContent;