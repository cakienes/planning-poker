import { shallow } from 'enzyme';
import React from 'react';
import Button from '../Button';
import IButtonProps from '../interface/IButtonProps';

describe('Button.tsx', () => {
    const onClickMock = jest.fn();
    const buttonProps: IButtonProps = {
        label: 'label',
        onClick: onClickMock,
        type: 'button',
    };

    it('renders without crashing', async () => {
        expect(shallow(<Button {...buttonProps} />)).toMatchSnapshot();
    });
});
