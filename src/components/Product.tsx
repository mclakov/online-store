import React from 'react';
import { prodData } from '../globalTypes';
import Button from './Button';

const Product = (props: any) => {
    return (
        <div
            className='product-item'
            style={{
                backgroundImage: `url(${props.prod.images[0]})`,
                backgroundSize: 'cover',
            }}
        >
            <div className='desc-text'>
                <div className='item-title'>
                    {props.prod.title}
                </div>
                <div className='item-info'>
                    <div className='category'>
                        {`Category: ${props.prod.category}`}
                    </div>
                    <div className='brand'>
                        {`Brand: ${props.prod.brand}`}
                    </div>
                    <div className='price'>
                        {'Price: €' + props.prod.price.toString()}
                    </div>
                    <div className='discount'>
                        {'Discount: ' + props.prod.discountPercentage.toString() + ' %'}
                    </div>
                    <div className='rating'>
                        {'Rating: ' + props.prod.rating}
                    </div>
                    <div className='stock'>
                        {'Stock: ' + props.prod.stock}
                    </div>
                </div>
            </div>
            <div className='item-buttons'>
                <Button
                    btnName={'ADD TO CART'}
                    class={'button-add'}
                    productId={props.prod.id}
                />
                <Button
                    btnName={'DETAILS'}
                    class={'button-det'}
                    productId={props.prod.id}
                />
            </div>
        </div>
    );
};

export default Product;
