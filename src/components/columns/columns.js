/**
 * Created by perandre on 6/14/16.
 */

import React from 'react';
import ColumnsAvailableList from './columnsAvailableList';
import ColumnButtons from './columnButtons';
import ColumnsSelectedList from './columnsSelectedList';

const Columns = () => (
        <div
            style={{display: 'flex', justifyContent: 'center', marginLeft: 'auto', 
                                        marginRight: 'auto', alignText: 'center'}}>
            <ColumnsAvailableList/>
            <ColumnButtons/>
            <ColumnsSelectedList/>
        </div>
);


export default Columns;