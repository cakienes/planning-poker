import { shallow } from 'enzyme';
import React from 'react';
import Input from '../Input';
import IInputProps from '../interface/IInputProps';

describe('Input.tsx', () => {
    let inputProps: IInputProps = {
        label: 'label',
        input: {
            name: 'name',
            onBlur: () => {},
            onChange: () => {},
            onDragStart: () => {},
            onDrop: () => {},
            onFocus: () => {},
            value: null,
        },
        meta: {
            asyncValidating: false,
            autofilled: false,
            dirty: false,
            // @ts-ignore
            dispatch: null,
            form: 'form',
            initial: false,
            invalid: false,
            pristine: false,
            submitFailed: false,
            submitting: false,
            touched: false,
            valid: false,
            visited: false,
        },
        placeholder: 'placeholder',
        type: 'text',
    };
    it('renders without crashing', async () => {
        expect(shallow(<Input {...inputProps} />)).toMatchSnapshot();
    });
    it('renders without crashing while error', async () => {
        inputProps = {
            ...inputProps,
            meta: {
                ...inputProps.meta,
                error: true,
                touched: true,
            },
        };
        expect(shallow(<Input {...inputProps} />)).toMatchSnapshot();
    });
});
