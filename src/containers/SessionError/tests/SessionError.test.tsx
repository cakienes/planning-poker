import React from 'react';
import { createRenderer, ShallowRenderer } from 'react-test-renderer/shallow';
import SessionError from '../SessionError';

describe('SessionError.tsx', () => {
    let renderer: ShallowRenderer;

    beforeEach(() => {
        renderer = createRenderer();
    });

    it('renders correctly SessionError', async () => {
        expect(renderer.render(<SessionError />)).toMatchSnapshot();
    });
});
