import React from 'react';
import ITextareaProps from './interface/ITextareaProps';
import './Textarea.scss';

const Textarea: React.FC<ITextareaProps> = ({ label, input, meta: { touched, error }, placeholder }) => {
    return (
        <div className="defaultTextareaHolder">
            <label className="defaultLabel">{label}</label>
            <div>
                <textarea className="defaultTextarea" id={input.name} placeholder={placeholder} rows={10} {...input} />
            </div>
        </div>
    );
};

export default Textarea;
