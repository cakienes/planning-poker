import { shallow } from 'enzyme';
import React from 'react';
import Input from '../Input';
import IInputProps from '../interface/IInputProps';

describe('Header.tsx', () => {
    const inputProps: IInputProps = {
        label: 'label',
        name: 'name',
        placeholder: 'placeholder',
    };
    it('renders without crashing', async () => {
        expect(shallow(<Input {...inputProps} />)).toMatchSnapshot();
    });
});
