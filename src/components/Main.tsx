import React from 'react';
import Filters from './Filters';
import Goods from './Goods';

const Main = (props: any) => {
    return (
        <div className='main'>
            <Filters/>
            <Goods
                products={props.products}
            />
        </div>
    );
};

export default Main;
