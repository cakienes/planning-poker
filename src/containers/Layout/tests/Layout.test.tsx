import React from 'react';
import { createRenderer, ShallowRenderer } from 'react-test-renderer/shallow';
import Layout from '../Layout';

describe('Layout.tsx', () => {
    let renderer: ShallowRenderer;
    beforeEach(() => {
        renderer = createRenderer();
    });

    it('renders correctly Layout', async () => {
        expect(renderer.render(<Layout />)).toMatchSnapshot();
    });
});
