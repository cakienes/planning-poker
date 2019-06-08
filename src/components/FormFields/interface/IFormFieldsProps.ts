import { WrappedFieldProps } from 'redux-form';

export default interface IFormFieldsProps extends WrappedFieldProps {
    type: string;
    placeholder?: string;
}
