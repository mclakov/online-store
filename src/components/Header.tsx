import React from 'react';

const Header = (props: any) => {
    return (
        <div className='header'>
            {/*let newUrl = new URL(window.location.protocol + "//" + window.location.host + window.location.pathname)*/}
            <h1
                onClick={() => {
                    window.location.pathname = 'store'
                }}
            >Online Store</h1>
            <div className='cart-total'>{`Cart total: € ${props.cartPriceTotal}`}</div>
            <div
                className='cart-icon'
                onClick={() => {
                    window.location.pathname = 'cart'
                }}
            >{props.cartAmountTotal}</div>
        </div>
    );
};

export default Header;
