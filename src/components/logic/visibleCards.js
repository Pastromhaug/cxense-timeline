/**
 * Created by perandre on 6/23/16.
 */

import React from 'react';
import { connect } from 'react-redux';
import Cards from '../presentation/cards'

const mapStateToProps = (state) => {
    return {
        query: state.query.query.query
    }
};

const VisibleCards = connect (
    mapStateToProps
)(Cards);

export default VisibleCards
