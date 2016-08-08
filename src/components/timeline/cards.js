/**
 * Created by perandre on 6/9/16.
 */

import React from 'react';
import {cardStyles} from '../../styles/componentStyles';
import {Card} from 'material-ui/Card';
import AppTable from './appTable';
import Chart from './chart';
import CardTitleAndExports from './cardTitleAndExports';
import Loader from './loader';

import {connect} from 'react-redux';
import {actionApplyQuery, actionTempQuery} from '../../actions/query';

/**
 * This component is a child of AppContent, and is mostly just a container for
 * the chart and the table, putting them both in material design cards.
 *
 * This component also contains hacky solution to making it possible to paste a url
 * with a query and have it actually show up in the chart
 *
 */

class  _Cards extends React.Component {

    render() {
        return(
            <div>
                <Card style={cardStyles.container}>
                    <CardTitleAndExports/> {/*the gray area with the chart query and the export menu*/}
                    <Loader/> {/*the loading bar that shows up when the query changes.
                                isn't visible most of the time*/}
                    <div style={{padding: '16px'}}>
                        <Chart /> {/*The actual chart*/}
                    </div>
                </Card>
                <Card style={cardStyles.container}>
                    <AppTable/> {/*The table containing info about each issue on the chart*/}
                </Card>
            </div>
        );
    }

    /**
     * hacky solution to making it possible to store queries in the url
     */
    componentDidMount() {
        var params = this.props.params;
        if (_.has(params, 'query')) {
            this.props.dispatchTempQuery(params.query);
        }
        this.props.dispatchApplyQuery();
    }
}


function mapStateToProps() {return {}}
function mapDispatchToProps(dispatch) {
    return {
        dispatchApplyQuery: () => {
            dispatch(actionApplyQuery())
        },
        dispatchTempQuery: (query) => {
            dispatch(actionTempQuery(query))
        }
    }
}

const Cards = connect(
    mapStateToProps,
    mapDispatchToProps
)(_Cards);

export default Cards