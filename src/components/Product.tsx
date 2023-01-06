import React from 'react';
import { prodData } from '../globalTypes';
import Button from './Button';

const Product = (props: any) => {
    return (
        <div className='product-item'>
            <div className='item-title'>
                {props.prod.title}
            </div>
            <div className='item-info'>
                <div className='category'>
                    {props.prod.category}
                </div>
                <div className='brand'>
                    {props.prod.brand}
                </div>
                <div className='price'>
                    {'€ ' + props.prod.price.toString()}
                </div>
                <div className='discount'>
                    {props.prod.discountPercentage.toString() + ' %'}
                </div>
                <div className='rating'>
                    {props.prod.rating}
                </div>
                <div className='stock'>
                    {props.prod.stock}
                </div>
            </div>
            <div className='item-buttons'>
                <Button
                    btnName={'ADD TO CART'}
                    class={'button-add'}
                />
                <Button
                    btnName={'DETAILS'}
                    class={'button-det'}
                />
            </div>
        </div>
    );
};

export default Product;
