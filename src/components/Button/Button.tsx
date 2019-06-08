import React from 'react';
import './Button.scss';
import IButtonProps from './interface/IButtonProps';

const Button = (props: IButtonProps) => {
    return (
        <div className="defaultButtonHolder">
            <button onClick={props.onClick}>{props.label}</button>
        </div>
    );
};

export default Button;
