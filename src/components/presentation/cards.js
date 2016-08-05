/**
 * Created by perandre on 6/9/16.
 */

import React from 'react';
import {cardStyles} from '../../styles/componentStyles';
import {Card} from 'material-ui/Card';
import AppTable from './../presentation/appTable';
import Chart from './chart';
import CardTitleAndExports from './cardTitleAndExports';
import Loader from './loader';

import {connect} from 'react-redux';
import {actionApplyQuery, actionTempQuery} from '../../actions/query';


class  _Cards extends React.Component {

    render() {
        return(
            <div>
                <Card style={cardStyles.container}>
                    <CardTitleAndExports/>
                    <Loader/>
                    <div style={{padding: '16px'}}>
                        <Chart />
                    </div>
                </Card>
                <Card style={cardStyles.container}>
                    <AppTable/>
                </Card>
            </div>
        );
    }

    componentDidMount() {
        var params = this.props.params;
        if (_.has(params, 'query')) {
            console.log('Cards: has param query: ' + params.query);
            this.props.dispatchTempQuery(params.query);
        } else {
            console.log('Cards: no param query');
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