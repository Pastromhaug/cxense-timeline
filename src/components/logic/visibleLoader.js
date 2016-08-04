/**
 * Created by perandre on 04.08.16.
 */

import React from 'react';
import {connect} from 'react-redux';
import Loader from '../presentation/loader';

function mapStateToProps(state) {
    return {
        loading: state.loading,
        issues: state.chart.issues
    }
}

const VisibleLoader = connect(
    mapStateToProps
)(Loader);

export default VisibleLoader;

