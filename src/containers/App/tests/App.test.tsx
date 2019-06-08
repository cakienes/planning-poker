import { shallow } from 'enzyme';
import React from 'react';
import { getLinksFromLocalStorage } from '../../../actions/creators/linkActions';
import { App, mapDispatchToProps } from '../App';
import IAppProps from '../interface/IAppProps';

describe('App.tsx', () => {
    const getLinksFromLocalStorageMock = jest.fn();
    const appProps: IAppProps = {
        getLinksFromLocalStorage: getLinksFromLocalStorageMock,
    };
    it('renders without crashing', async () => {
        expect(shallow(<App {...appProps} />)).toMatchSnapshot();
    });

    it('SHOULD have call getLinksFromLocalStorage', async () => {
        shallow(<App {...appProps} />);
        expect(getLinksFromLocalStorageMock).toHaveBeenCalled();
    });

    describe('mapDispatchToProps', () => {
        it('should dispatch getLinksFromLocalStorage when called', () => {
            const dispatchMock = jest.fn();
            const result = mapDispatchToProps(dispatchMock);
            result.getLinksFromLocalStorage();
            expect(JSON.stringify(dispatchMock.mock.calls[0][0])).toEqual(JSON.stringify(getLinksFromLocalStorage()));
        });
    });
});
