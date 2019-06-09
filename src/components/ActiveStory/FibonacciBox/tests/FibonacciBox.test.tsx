import React from 'react';
import { createRenderer, ShallowRenderer } from 'react-test-renderer/shallow';
import FibonacciBox from '../FibonacciBox';

describe('FibonacciBox.tsx', () => {
    let renderer: ShallowRenderer;

    const giveStoryPointMock = jest.fn();
    let fibonacciBoxProps: any = {};

    beforeEach(() => {
        renderer = createRenderer();

        fibonacciBoxProps = {
            giveStoryPoint: giveStoryPointMock,
            fibonacciNumber: 1,
            storyPoint: 1,
        };
    });

    it('renders correctly FibonacciBox', async () => {
        expect(renderer.render(<FibonacciBox {...fibonacciBoxProps} />)).toMatchSnapshot();
    });

    it('renders correctly FibonacciBox while fibonacciNumber is 0', async () => {
        fibonacciBoxProps = {
            ...fibonacciBoxProps,
            fibonacciNumber: 0,
            storyPoint: 1,
        };
        renderer.render(<FibonacciBox {...fibonacciBoxProps} />);
        const instance: any = renderer.getMountedInstance();

        expect(instance.render()).toMatchSnapshot();
    });

    it('onClickFibonacci of FibonacciBox', async () => {
        renderer.render(<FibonacciBox {...fibonacciBoxProps} />);
        const instance: any = renderer.getMountedInstance();

        instance.onClickFibonacci();

        expect(giveStoryPointMock).toHaveBeenCalledWith(1);
    });
});
