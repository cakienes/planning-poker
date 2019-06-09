import * as React from 'react';
import { createRenderer, ShallowRenderer } from 'react-test-renderer/shallow';
import FormFields from '../FormFields';

describe('FormField', () => {
    let renderer: ShallowRenderer;
    let formFieldsProps: any = null;

    beforeEach(() => {
        renderer = createRenderer();
        formFieldsProps = {
            input: {
                name: null,
                onBlur: null,
                onChange: null,
                onDragStart: null,
                onDrop: null,
                onFocus: null,
                value: null,
            },
            meta: {
                asyncValidating: null,
                autofilled: null,
                dirty: null,
                dispatch: null,
                form: null,
                initial: null,
                invalid: null,
                pristine: null,
                submitFailed: null,
                submitting: null,
                touched: null,
                valid: null,
                visited: null,
            },
            placeholder: null,
            type: null,
        };
    });

    it('rendered correctly FormField while type is text', () => {
        formFieldsProps = {
            ...formFieldsProps,
            type: 'text',
        };
        // @ts-ignore https://github.com/microsoft/TypeScript/issues/21699
        expect(renderer.render(<FormFields {...formFieldsProps} />)).toMatchSnapshot();
    });

    it('rendered correctly FormField while type is number', () => {
        formFieldsProps = {
            ...formFieldsProps,
            type: 'number',
        };
        // @ts-ignore https://github.com/microsoft/TypeScript/issues/21699
        expect(renderer.render(<FormFields {...formFieldsProps} />)).toMatchSnapshot();
    });

    it('rendered correctly FormField while type is textarea', () => {
        formFieldsProps = {
            ...formFieldsProps,
            type: 'textarea',
        };
        // @ts-ignore https://github.com/microsoft/TypeScript/issues/21699
        expect(renderer.render(<FormFields {...formFieldsProps} />)).toMatchSnapshot();
    });

    it('rendered correctly FormField while type is textarea', () => {
        formFieldsProps = {
            ...formFieldsProps,
            type: 'type',
        };
        // @ts-ignore https://github.com/microsoft/TypeScript/issues/21699
        expect(renderer.render(<FormFields {...formFieldsProps} />)).toMatchSnapshot();
    });
});
