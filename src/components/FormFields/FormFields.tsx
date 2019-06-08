import React from 'react';
import Input from './Input/Input';
import IFormFieldsProps from './interface/IFormFieldsProps';
import Textarea from './Textarea/Textarea';

const FormFields = (props: IFormFieldsProps) => {
    switch (props.type) {
        case 'text':
        case 'number':
            return <Input {...props} />;
        case 'textarea':
            return <Textarea {...props} />;
        default:
            break;
    }
};

export default FormFields;
