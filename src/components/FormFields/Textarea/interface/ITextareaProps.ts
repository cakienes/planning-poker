import { WrappedFieldProps } from 'redux-form';

export default interface ITextareaProps extends WrappedFieldProps {
    label?: string;
    placeholder?: string;
}
