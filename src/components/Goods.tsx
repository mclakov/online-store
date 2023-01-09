import React from 'react';
import { AppProps, prodData, propsGods } from '../globalTypes';
import Product from './Product';

const Goods = (props: propsGods) => {

    const createGoods = () => {
      const goodsArr = props.products.map((prod: prodData, index: number) => {
          return (
              <Product
                  products={props.products}
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
