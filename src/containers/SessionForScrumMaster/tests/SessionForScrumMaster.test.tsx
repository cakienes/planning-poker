import React from 'react';
import { createRenderer, ShallowRenderer } from 'react-test-renderer/shallow';
import { UserTypeEnum } from '../../../helper/Enum';
import {
    getSessionsFromLocalStorage,
    giveStoryPoint,
    setSelectedSession,
} from '../../../redux/session/session.actions';
import ISessionForScrumMasterProps from '../interface/ISessionForScrumMasterProps';
import { mapDispatchToProps, SessionForScrumMaster } from '../SessionForScrumMaster';

jest.mock('uuid', () => {
    return jest.fn().mockImplementation(() => {
        return 1;
    });
});

jest.mock('react-redux-toastr', () => {
    return {
        toastr: {
            error: jest.fn(),
        },
    };
});

jest.useFakeTimers();

describe('SessionForScrumMaster.tsx', () => {
    let renderer: ShallowRenderer;
    const getSessionsFromLocalStorageMock = jest.fn();
    const giveStoryPointMock = jest.fn();
    const setSelectedSessionMock = jest.fn();

    let sessionForScrumMasterProps: ISessionForScrumMasterProps = {} as any;

    beforeEach(() => {
        renderer = createRenderer();
        sessionForScrumMasterProps = {
            history: {} as any,
            location: {} as any,
            match: {
                params: {},
            } as any,
            staticContext: {} as any,
            getSessionsFromLocalStorage: getSessionsFromLocalStorageMock,
            giveStoryPoint: giveStoryPointMock,
            setSelectedSession: setSelectedSessionMock,
            activeUserStory: undefined,
            selectedSession: undefined,
        };
    });

    it('renders correctly SessionForScrumMaster', async () => {
        expect(renderer.render(<SessionForScrumMaster {...sessionForScrumMasterProps} />)).toMatchSnapshot();
    });

    it('renders correctly SessionForScrumMaster while selectedSession.optionalUrl is not defined', async () => {
        sessionForScrumMasterProps = {
            ...sessionForScrumMasterProps,
            selectedSession: {
                id: 'id',
                developers: [],
                numberOfVoters: 2,
                optionalUrl: undefined,
                sessionName: 'sessionName',
                userStories: [],
            },
        };
        expect(renderer.render(<SessionForScrumMaster {...sessionForScrumMasterProps} />)).toMatchSnapshot();
    });

    it('renders correctly SessionForScrumMaster while selectedSession.optionalUrl is defined', async () => {
        sessionForScrumMasterProps = {
            ...sessionForScrumMasterProps,
            selectedSession: {
                id: 'id',
                developers: [],
                numberOfVoters: 2,
                optionalUrl: 'optionalUrl',
                sessionName: 'sessionName',
                userStories: [],
            },
        };
        expect(renderer.render(<SessionForScrumMaster {...sessionForScrumMasterProps} />)).toMatchSnapshot();
    });

    it('componentDidMount of SessionForScrumMaster', async () => {
        renderer.render(<SessionForScrumMaster {...sessionForScrumMasterProps} />);
        const instance: any = renderer.getMountedInstance();

        instance.reRenderComponent = jest.fn();

        instance.componentDidMount();

        expect(setInterval).toHaveBeenCalledWith(instance.reRenderComponent, 1000);
    });

    it('componentDidMount of SessionForScrumMaster while id is defined', async () => {
        sessionForScrumMasterProps = {
            ...sessionForScrumMasterProps,
            match: {
                params: {
                    id: 'id',
                },
            } as any,
        };

        renderer.render(<SessionForScrumMaster {...sessionForScrumMasterProps} />);
        const instance: any = renderer.getMountedInstance();

        instance.componentDidMount();

        expect(setSelectedSessionMock).toHaveBeenCalledWith('id');
    });

    it('reRenderComponent of SessionForScrumMaster', async () => {
        renderer.render(<SessionForScrumMaster {...sessionForScrumMasterProps} />);
        const instance: any = renderer.getMountedInstance();

        instance.reRenderComponent();

        expect(getSessionsFromLocalStorageMock).toHaveBeenCalled();
    });

    describe('mapDispatchToProps', () => {
        it('should dispatch getSessionsFromLocalStorage when called', () => {
            const dispatchMock = jest.fn();
            const result = mapDispatchToProps(dispatchMock);
            result.getSessionsFromLocalStorage();
            expect(JSON.stringify(dispatchMock.mock.calls[0][0])).toEqual(
                JSON.stringify(getSessionsFromLocalStorage()),
            );
        });

        it('should dispatch setSelectedSession when called', () => {
            const dispatchMock = jest.fn();
            const result = mapDispatchToProps(dispatchMock);
            result.giveStoryPoint(UserTypeEnum.SCRUM_MASTER, 5);
            expect(JSON.stringify(dispatchMock.mock.calls[0][0])).toEqual(
                JSON.stringify(giveStoryPoint(UserTypeEnum.SCRUM_MASTER, 5)),
            );
        });

        it('should dispatch setSelectedSession when called', () => {
            const dispatchMock = jest.fn();
            const result = mapDispatchToProps(dispatchMock);
            result.setSelectedSession('id');
            expect(JSON.stringify(dispatchMock.mock.calls[0][0])).toEqual(JSON.stringify(setSelectedSession('id')));
        });
    });
});
