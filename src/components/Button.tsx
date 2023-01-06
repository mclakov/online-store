import React from 'react';

const Button = (props: any) => {

    const btnHandler = () => {
      console.log('props.btnName = ', props.btnName);
      console.log('props.id = ', props.productId);
    }

    return (
        <div className='button'>
            <button onClick={btnHandler}>{props.btnName}</button>
        </div>
    );
};

export default Button;
