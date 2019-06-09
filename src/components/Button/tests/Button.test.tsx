import React from 'react';
import { createRenderer, ShallowRenderer } from 'react-test-renderer/shallow';
import Button from '../Button';
import IButtonProps from '../interface/IButtonProps';

describe('Button.tsx', () => {
    let renderer: ShallowRenderer;

    const onClickMock = jest.fn();
    const buttonProps: IButtonProps = {
        label: 'label',
        onClick: onClickMock,
        type: 'button',
    };

    beforeEach(() => {
        renderer = createRenderer();
    });

    it('render correctly Button', async () => {
        expect(renderer.render(<Button {...buttonProps} />)).toMatchSnapshot();
    });
});
