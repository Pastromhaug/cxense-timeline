/**
 * Created by perandre on 6/23/16.
 */

import React from 'react';
import { connect } from 'react-redux';
import AppContent from '../presentation/appContent';
import {actionReplaceIssues} from '../../actions/issues';

const mapStateToProps = (state) => {
    return {
        query: state.query.query.query
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchReplaceIssues: (issues) => {
            dispatch( actionReplaceIssues(issues) )
        }
    }
};

const VisibleAppContent = connect (
    mapStateToProps,
    mapDispatchToProps
)(AppContent);

export default VisibleAppContent;