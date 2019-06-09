import React from 'react';
import { createRenderer, ShallowRenderer } from 'react-test-renderer/shallow';
import { CreateSessionForm } from '../CreateSessionForm';
import ICreateSessionFormProps from '../interface/ICreateSessionFormProps';

describe('CreateSessionForm.tsx', () => {
    let renderer: ShallowRenderer;
    const handleSubmitMock = jest.fn();

    let createSessionFormProps: ICreateSessionFormProps = {
        handleSubmit: handleSubmitMock,
    };

    beforeEach(() => {
        renderer = createRenderer();
        createSessionFormProps = {
            handleSubmit: handleSubmitMock,
        };
    });

    it('renders correctly CreateSessionForm', async () => {
        expect(renderer.render(<CreateSessionForm {...createSessionFormProps} />)).toMatchSnapshot();
    });
});
