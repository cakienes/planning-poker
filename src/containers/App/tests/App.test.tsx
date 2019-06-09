import React from 'react';
import { createRenderer, ShallowRenderer } from 'react-test-renderer/shallow';
import { getSessionsFromLocalStorage } from '../../../redux/session/session.actions';
import { App, mapDispatchToProps } from '../App';
import IAppProps from '../interface/IAppProps';

describe('App.tsx', () => {
    let renderer: ShallowRenderer;
    const getSessionsFromLocalStorageMock = jest.fn();
    let appProps: IAppProps = {
        getSessionsFromLocalStorage: getSessionsFromLocalStorageMock,
    };

    beforeEach(() => {
        renderer = createRenderer();
        appProps = {
            getSessionsFromLocalStorage: getSessionsFromLocalStorageMock,
        };
    });
    it('renders correctly UserStoryList', async () => {
        expect(renderer.render(<App {...appProps} />)).toMatchSnapshot();
    });

    it('should call getSessionsFromLocalStorageMock', async () => {
        renderer.render(<App {...appProps} />);
        expect(getSessionsFromLocalStorageMock).toHaveBeenCalled();
    });

    describe('mapDispatchToProps', () => {
        it('should dispatch getLinksFromLocalStorage when called', () => {
            const dispatchMock = jest.fn();
            const result = mapDispatchToProps(dispatchMock);
            result.getSessionsFromLocalStorage();
            expect(JSON.stringify(dispatchMock.mock.calls[0][0])).toEqual(
                JSON.stringify(getSessionsFromLocalStorage()),
            );
        });
    });
});
