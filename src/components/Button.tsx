import React from 'react';
import { propsBtn } from '../../src/globalTypes';

const Button = (props: propsBtn) => {

    return (
        <div className='button'>
            <button onClick={() => props.btnHandler(props.act,  props.productId)}>{props.btnName}</button>
        </div>
    );
};

export default Button;
