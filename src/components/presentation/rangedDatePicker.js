/**
 * Created by perandre on 6/13/16.
 */

import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import Toggle from 'material-ui/Toggle';
import {datePicker} from '../../styles/componentStyles';
var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

const optionsStyle = {
    display: 'flex',
    float: 'left'
};


const RangedDatePicker = ({start_date, end_date,
    dispatchTempStartDate, dispatchTempEndDate}) => (

        <div style={optionsStyle}>
            <DatePicker style={datePicker}
                onChange={ (event, data) => {
                    dispatchTempStartDate(data);
                } }
                floatingLabelText="Min Date"
                defaultDate={start_date}
                container="inline"
                autoOk={true}
            />
            <DatePicker style={datePicker}
                onChange={ (event, data) => {
                    dispatchTempEndDate(data);
                }}
                floatingLabelText="Max Date"
                defaultDate={end_date}
                container="inline"
                autoOk={true}
            />
        </div>
);

export default RangedDatePicker;