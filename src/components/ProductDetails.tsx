import React, { useState } from 'react';
import Button from './Button';
import { propsPD } from '../../src/globalTypes';

const ProductDetails = (props: propsPD) => {

    const [picMain, setPicMain] = useState(0);

    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    const prod = props.products[3];


    return (
        <div className='product-details'>
            <div className='link-navigation'>
                {`STORE >> ${prod.category.toUpperCase()} >> ${prod.brand.toUpperCase()} >> ${prod.title.toUpperCase()}`}
            </div>
            <div className='product-item'>
                <div className='item-title'>
                    {prod.title}
                </div>
                <div className='product-description'>
                    <div className='pics-block'>
                        <div className='pics'>
                            <div
                                className='pic-1'
                                onClick={() => setPicMain(0)}
                                style={{
                                    backgroundImage: `url(${prod.images[0]})`,
                                    backgroundSize: 'cover',
                                }}
                            ></div>
                            <div
                                className='pic-2'
                                onClick={() => setPicMain(1)}
                                style={{
                                    backgroundImage: `url(${prod.images[1]})`,
                                    backgroundSize: 'cover',
                                }}
                            ></div>
                            <div
                                className='pic-3'
                                onClick={() => setPicMain(2)}
                                style={{
                                    backgroundImage: `url(${prod.images[2]})`,
                                    backgroundSize: 'cover',
                                }}
                            ></div>
                            <div
                                className='pic-4'
                                onClick={() => setPicMain(3)}
                                style={{
                                    backgroundImage: `url(${prod.images[3]})`,
                                    backgroundSize: 'cover',
                                }}
                            ></div>
                        </div>
                        <div
                            className='pic-main'
                            style={{
                                backgroundImage: `url(${prod.images[picMain]})`,
                                backgroundSize: 'cover',
                            }}
                        ></div>
                    </div>
                    <div className='item-info'>
                        <div className='category'>
                            <div className='category-1'>Category:</div>
                            <div className='category-2'>{prod.category}</div>
                        </div>
                        <div className='description'>
                            <div className='description-1'>Description:</div>
                            <div className='description-2'>{prod.description}</div>
                        </div>
                        <div className='brand'>
                            <div className='brand-1'>Brand:</div>
                            <div className='brand-2'>{prod.brand}</div>
                        </div>
                        <div className='discount'>
                            <div className='discount-1'>Discount:</div>
                            <div className='discount-2'>{prod.discountPercentage.toString() + ' %'}</div>
                        </div>
                        <div className='rating'>
                            <div className='rating-1'>Rating:</div>
                            <div className='rating-2'>{prod.rating}</div>
                        </div>
                        <div className='stock'>
                            <div className='stock-1'>Stock:</div>
                            <div className='stock-2'>{prod.stock}</div>
                        </div>
                    </div>
                    <div className='item-buttons'>
                        <div className='price'>
                            {'Price: €' + prod.price.toString()}
                        </div>
                        <Button
                            btnName={'ADD TO CART'}
                            class={'button-add'}
                            productId={prod.id}
                            act={'add'}
                            btnHandler={props.btnHandler}
                        />
                        <Button
                            btnName={'BUY NOW'}
                            class={'button-buy-now'}
                            productId={prod.id}
                            act={'bye'}
                            btnHandler={props.btnHandler}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
