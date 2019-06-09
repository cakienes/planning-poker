import React from 'react';
import { createRenderer, ShallowRenderer } from 'react-test-renderer/shallow';
import { FinalScoreForm } from '../FinalScoreForm';
import IFinalScoreFormProps from '../interface/IFinalScoreFormProps';

describe('FinalScoreForm.tsx', () => {
    let renderer: ShallowRenderer;
    const handleSubmitMock = jest.fn();

    let finalScoreFormProps: IFinalScoreFormProps = {
        handleSubmit: handleSubmitMock,
    };

    beforeEach(() => {
        renderer = createRenderer();
        finalScoreFormProps = {
            handleSubmit: handleSubmitMock,
            activeUserStory: undefined,
        };
    });

    it('renders correctly FinalScoreForm', async () => {
        expect(renderer.render(<FinalScoreForm {...finalScoreFormProps} />)).toMatchSnapshot();
    });

    it('renders correctly FinalScoreForm while activeUserStory is define', async () => {
        finalScoreFormProps = {
            ...finalScoreFormProps,
            activeUserStory: {
                storyName: 'storyName',
            },
        };
        expect(renderer.render(<FinalScoreForm {...finalScoreFormProps} />)).toMatchSnapshot();
    });
});
