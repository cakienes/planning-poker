import { shallow } from 'enzyme';
import React from 'react';
import Layout from '../Layout';

describe('Layout.tsx', () => {
    it('renders without crashing', async () => {
        expect(shallow(<Layout />)).toMatchSnapshot();
    });
});
