import React from 'react';
import Input from './Input/Input';
import IFormFieldsProps from './interface/IFormFieldsProps';
import Textarea from './Textarea/Textarea';

const FormFields = (props: IFormFieldsProps): React.ReactNode => {
    switch (props.type) {
        case 'text':
        case 'number':
            return <Input {...props} />;
        case 'textarea':
            return <Textarea {...props} />;
        default:
            return null;
    }
};

export default FormFields;
