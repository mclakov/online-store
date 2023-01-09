import React from 'react';
import Filters from './Filters';
import Goods from './Goods';

const Main = (props: any) => {
    return (
        <div className='main'>
            <Filters
                products={props.products}
                applyFilters={props.applyFilters}
            />
            <Goods
                products={props.products}
                btnHandler={props.btnHandler}
            />
        </div>
    );
};

export default Main;
