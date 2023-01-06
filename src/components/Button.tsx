import React from 'react';

const Button = (props: any) => {

    const btnHandler = () => {
      console.log('props.btnName = ', props.btnName);
    }

    return (
        <div className='button'>
            <button onClick={btnHandler}>{props.btnName}</button>
        </div>
    );
};

export default Button;
