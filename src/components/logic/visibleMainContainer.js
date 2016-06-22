/**
 * Created by perandre on 6/22/16.
 */
/**
 * Created by perandre on 6/22/16.
 */
import React from 'react';
import { connect } from 'react-redux';
import MainContainer from '../presentation/mainContainer';

const mapStateToProps = (state) => {
    return {
        issues : state.issues
    }
};

const VisibleMainContainer = connect (
    mapStateToProps
)(MainContainer);

export default VisibleMainContainer
