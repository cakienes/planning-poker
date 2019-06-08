import { WrappedFieldProps } from 'redux-form';

export default interface IInputProps extends WrappedFieldProps {
    label?: string;
    placeholder?: string;
    type?: string;
}
