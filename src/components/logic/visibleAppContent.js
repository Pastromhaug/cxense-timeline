/**
 * Created by perandre on 6/23/16.
 */

import React from 'react';
import { connect } from 'react-redux';
import AppContent from '../presentation/appContent';
import {actionAddIssues} from '../../actions/issues';

const mapStateToProps = (state) => {
    return {
        query: state.query.query.query
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchAddIssues: (issues) => {
            dispatch( actionAddIssues(issues) )
        }
    }
};

const VisibleAppContent = connect (
    mapStateToProps,
    mapDispatchToProps
)(AppContent);

export default VisibleAppContent;