import React from 'react';
import Filters from './Filters';
import Goods from './Goods';
import { propsFilt, propsMain } from '../../src/globalTypes';

const Main = (props: propsMain) => {
    return (
        <div className='main'>
            <Filters
                products={props.products}
                applyFilters={props.applyFilters}
                applySearch={props.applySearch}
            />
            <Goods
                products={props.products}
                btnHandler={props.btnHandler}
            />
        </div>
    );
};

export default Main;
