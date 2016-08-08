/**
 * Created by perandre on 6/14/16.
 */

import React from 'react';
import ColumnsAvailableList from './columnsAvailableList';
import ColumnButtons from './columnButtons';
import ColumnsSelectedList from './columnsSelectedList';

/**
 *
 * Contains the content of the '/columns' route.
 */

const Columns = () => (
        <div
            style={{display: 'flex', justifyContent: 'center', marginLeft: 'auto', 
                                        marginRight: 'auto', alignText: 'center'}}>
            <ColumnsAvailableList/> {/*The list of columns on the left side of the buttons*/}
            <ColumnButtons/>
            <ColumnsSelectedList/> {/*list of columns on the righ side of the buttons*/}
        </div>
);


export default Columns;