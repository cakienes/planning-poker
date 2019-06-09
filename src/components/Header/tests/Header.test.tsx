import React from 'react';
import { createRenderer, ShallowRenderer } from 'react-test-renderer/shallow';
import Header from '../Header';

describe('Header.tsx', () => {
    let renderer: ShallowRenderer;
    beforeEach(() => {
        renderer = createRenderer();
    });

    it('render correctly Header', async () => {
        expect(renderer.render(<Header />)).toMatchSnapshot();
    });
});
