import React from 'react';
import './Input.scss';
import IInputProps from './interface/IInputProps';

const Input = (props: IInputProps) => {
    const {
        input,
        meta: { touched, error },
        type,
        placeholder,
    } = props;
    return (
        <div className="defaultInputHolder">
            <label className="defaultLabel">{props.label}</label>
            <div className={`${touched && error ? 'error' : undefined}`}>
                <input id={input.name} className="defaultInput" type={type} placeholder={placeholder} {...input} />
            </div>
        </div>
    );
};

export default Input;
