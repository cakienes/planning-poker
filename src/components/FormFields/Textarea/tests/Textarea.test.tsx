import { shallow } from 'enzyme';
import React from 'react';
import ITextareaProps from '../interface/ITextareaProps';
import Textarea from '../Textarea';

describe('Textarea.tsx', () => {
    let textareaProps: ITextareaProps = {
        label: 'label',
        placeholder: 'placeholder',
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
    };
    it('renders correctly TextArea', async () => {
        expect(shallow(<Textarea {...textareaProps} />)).toMatchSnapshot();
    });

    it('renders without crashing while error', async () => {
        textareaProps = {
            ...textareaProps,
            meta: {
                ...textareaProps.meta,
                error: true,
                touched: true,
            },
        };
        expect(shallow(<Textarea {...textareaProps} />)).toMatchSnapshot();
    });
});
