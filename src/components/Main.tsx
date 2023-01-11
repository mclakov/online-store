import React, { useEffect } from 'react';
import Filters from './Filters';
import Goods from './Goods';
import { propsMain } from '../../src/globalTypes';

const Main = (props: propsMain) => {

    return (
        <div className='main'>
            <Filters
                products={props.products}
                applyFilters={props.applyFilters}
                applySearch={props.applySearch}
                queryParams={props.queryParams}
                resetFilters={props.resetFilters}
            />
            <Goods
                products={props.products}
                btnHandler={props.btnHandler}
            />
        </div>
    );
};

export default Main;
