import React from 'react';
import { AppProps, prodData } from '../globalTypes';
import Product from './Product';

const Goods = (props: any) => {

    const createGoods = () => {
      const goodsArr = props.products.map((prod: prodData, index: number) => {
          return (
              <Product
                  key={index}
                  prod={prod}
                  btnHandler={props.btnHandler}
              />
          )
      })
        return goodsArr;
    }

    return (
        <div className='goods'>
            {createGoods()}
        </div>
    );
};

export default Goods;
