import React from 'react';
import { prodData } from '../globalTypes';
import Button from './Button';
import { propsProd } from '../../src/globalTypes';
import { Link } from 'react-router-dom';

const Product = (props: propsProd) => {
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
                    act={'add'}
                    class={'button-add'}
                    productId={props.prod.id}
                    btnHandler={props.btnHandler}
                />
                <Link className='link' to={`/product-details/${props.prod.id}`}>DETAILS</Link>
            </div>
        </div>
    );
};

export default Product;
