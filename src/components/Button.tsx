import React from 'react';

const Button = (props: any) => {

    return (
        <div className='button'>
            <button onClick={() => props.btnHandler(props.act,  props.productId)}>{props.btnName}</button>
        </div>
    );
};

export default Button;
