import React from 'react';
import { toastr } from 'react-redux-toastr';
import { createRenderer, ShallowRenderer } from 'react-test-renderer/shallow';
import uuid from 'uuid';
import { UserTypeEnum } from '../../../helper/Enum';
import ISession from '../../../interfaces/ISession';
import {
    getSessionsFromLocalStorage,
    giveStoryPoint,
    setDeveloper,
    setNewDeveloper,
    setSelecedSessionByUrl,
    setSelectedSession,
} from '../../../redux/session/session.actions';
import ISessionForDeveloperProps from '../interface/ISessionForDeveloperProps';
import { mapDispatchToProps, SessionForDeveloper } from '../SessionForDeveloper';

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

describe('SessionForDeveloper.tsx', () => {
    let renderer: ShallowRenderer;
    const getSessionsFromLocalStorageMock = jest.fn();
    const giveStoryPointMock = jest.fn();
    const setDeveloperMock = jest.fn();
    const setNewDeveloperMock = jest.fn();
    const setSelecedSessionByUrlMock = jest.fn();
    const setSelectedSessionMock = jest.fn();

    let sessionForDeveloperProps: ISessionForDeveloperProps = {
        history: {} as any,
        location: {} as any,
        match: {
            params: {},
        } as any,
        staticContext: {} as any,
        getSessionsFromLocalStorage: getSessionsFromLocalStorageMock,
        giveStoryPoint: giveStoryPointMock,
        setDeveloper: setDeveloperMock,
        setNewDeveloper: setNewDeveloperMock,
        setSelecedSessionByUrl: setSelecedSessionByUrlMock,
        setSelectedSession: setSelectedSessionMock,
    };

    beforeEach(() => {
        renderer = createRenderer();
        sessionForDeveloperProps = {
            history: {} as any,
            location: {} as any,
            match: {
                params: {},
            } as any,
            staticContext: {} as any,
            getSessionsFromLocalStorage: getSessionsFromLocalStorageMock,
            giveStoryPoint: giveStoryPointMock,
            setDeveloper: setDeveloperMock,
            setNewDeveloper: setNewDeveloperMock,
            setSelecedSessionByUrl: setSelecedSessionByUrlMock,
            setSelectedSession: setSelectedSessionMock,
        };
    });

    it('renders correctly SessionForDeveloper', async () => {
        expect(renderer.render(<SessionForDeveloper {...sessionForDeveloperProps} />)).toMatchSnapshot();
    });

    it('componentWillMount of SessionForDeveloper while id is not null', async () => {
        sessionForDeveloperProps = {
            ...sessionForDeveloperProps,
            match: {
                params: {
                    id: 'id',
                },
            } as any,
        };
        renderer.render(<SessionForDeveloper {...sessionForDeveloperProps} />);
        const instance: any = renderer.getMountedInstance();

        instance.componentWillMount();

        expect(setSelectedSessionMock).toHaveBeenCalledWith('id');
    });

    it('componentWillMount of SessionForDeveloper while optionalUrl is not null', async () => {
        sessionForDeveloperProps = {
            ...sessionForDeveloperProps,
            match: {
                params: {
                    optionalUrl: 'optionalUrl',
                },
            } as any,
        };
        renderer.render(<SessionForDeveloper {...sessionForDeveloperProps} />);
        const instance: any = renderer.getMountedInstance();

        instance.componentWillMount();

        expect(setSelecedSessionByUrlMock).toHaveBeenCalledWith('optionalUrl');
    });

    it('componentWillReceiveProps of SessionForDeveloper nextProps.selectedSession.id is not null', async () => {
        sessionForDeveloperProps = {
            ...sessionForDeveloperProps,
            match: {
                params: {
                    optionalUrl: 'optionalUrl',
                },
            } as any,
        };
        renderer.render(<SessionForDeveloper {...sessionForDeveloperProps} />);
        const instance: any = renderer.getMountedInstance();

        instance.checkSessionAvailability = jest.fn();

        let dumNextProps: ISessionForDeveloperProps = Object.assign({}, sessionForDeveloperProps);
        dumNextProps.selectedSession = {
            id: 'id',
            developers: [],
            numberOfVoters: 2,
            sessionName: 'sessionName',
            userStories: [],
        };

        instance.componentWillReceiveProps(dumNextProps);

        expect(instance.checkSessionAvailability).toHaveBeenCalledWith(dumNextProps.selectedSession);
    });

    it('componentDidMount of SessionForDeveloper', async () => {
        renderer.render(<SessionForDeveloper {...sessionForDeveloperProps} />);
        const instance: any = renderer.getMountedInstance();

        instance.reRenderComponent = jest.fn();

        instance.componentDidMount();

        expect(setInterval).toHaveBeenCalledWith(instance.reRenderComponent, 1000);
    });

    it('checkSessionAvailability  of SessionForDeveloper while selectedSession is null', async () => {
        renderer.render(<SessionForDeveloper {...sessionForDeveloperProps} />);
        const instance: any = renderer.getMountedInstance();

        instance.checkSessionAvailability(undefined);

        expect(toastr.error).toHaveBeenCalledWith('SESSION NOT FOUND', '');
    });

    it('checkSessionAvailability  of SessionForDeveloper while developerId is not null & not a user', async () => {
        sessionForDeveloperProps = {
            ...sessionForDeveloperProps,
            match: {
                params: {
                    developerId: 'developerId',
                },
            } as any,
            history: {
                push: jest.fn(),
            } as any,
        };
        renderer.render(<SessionForDeveloper {...sessionForDeveloperProps} />);
        const instance: any = renderer.getMountedInstance();

        const dumSelectedSession: ISession = {
            id: 'id',
            developers: [],
            numberOfVoters: 2,
            sessionName: 'sessionName',
            userStories: [],
        };

        instance.checkSessionAvailability(dumSelectedSession);

        expect(sessionForDeveloperProps.history.push).toHaveBeenCalledWith('/session-error');
    });

    it('checkSessionAvailability  of SessionForDeveloper while developerId is not null & a user', async () => {
        sessionForDeveloperProps = {
            ...sessionForDeveloperProps,
            match: {
                params: {
                    developerId: 'developerId',
                },
            } as any,
            history: {
                push: jest.fn(),
            } as any,
        };
        renderer.render(<SessionForDeveloper {...sessionForDeveloperProps} />);
        const instance: any = renderer.getMountedInstance();

        const dumSelectedSession: ISession = {
            id: 'id',
            developers: ['developerId'],
            numberOfVoters: 2,
            sessionName: 'sessionName',
            userStories: [],
        };

        instance.checkSessionAvailability(dumSelectedSession);

        expect(setDeveloperMock).toHaveBeenCalledWith('developerId');
    });

    it('checkSessionAvailability  of SessionForDeveloper while length < numberOfVoters ', async () => {
        sessionForDeveloperProps = {
            ...sessionForDeveloperProps,
            history: {
                replace: jest.fn(),
            } as any,
        };
        renderer.render(<SessionForDeveloper {...sessionForDeveloperProps} />);
        const instance: any = renderer.getMountedInstance();

        const dumSelectedSession: ISession = {
            id: 'id',
            developers: [],
            numberOfVoters: 2,
            sessionName: 'sessionName',
            userStories: [],
        };

        const dumGuid = uuid();
        instance.checkSessionAvailability(dumSelectedSession);

        expect(sessionForDeveloperProps.history.replace).toHaveBeenCalledWith(`/session/id/developer/${dumGuid}`);
        expect(setNewDeveloperMock).toHaveBeenCalledWith(dumGuid);
    });

    it('checkSessionAvailability  of SessionForDeveloper while length < numberOfVoters ', async () => {
        sessionForDeveloperProps = {
            ...sessionForDeveloperProps,
            history: {
                push: jest.fn(),
            } as any,
        };
        renderer.render(<SessionForDeveloper {...sessionForDeveloperProps} />);
        const instance: any = renderer.getMountedInstance();

        const dumSelectedSession: ISession = {
            id: 'id',
            developers: ['developerId'],
            numberOfVoters: 1,
            sessionName: 'sessionName',
            userStories: [],
        };

        instance.checkSessionAvailability(dumSelectedSession);

        expect(sessionForDeveloperProps.history.push).toHaveBeenCalledWith('/session-error');
    });

    it('reRenderComponent of SessionForDeveloper', async () => {
        renderer.render(<SessionForDeveloper {...sessionForDeveloperProps} />);
        const instance: any = renderer.getMountedInstance();

        instance.reRenderComponent();

        expect(getSessionsFromLocalStorageMock).toHaveBeenCalled();
    });

    describe('mapDispatchToProps', () => {
        it('should dispatch setSelectedSession when called', () => {
            const dispatchMock = jest.fn();
            const result = mapDispatchToProps(dispatchMock);
            result.setSelectedSession('id');
            expect(JSON.stringify(dispatchMock.mock.calls[0][0])).toEqual(JSON.stringify(setSelectedSession('id')));
        });

        it('should dispatch getSessionsFromLocalStorage when called', () => {
            const dispatchMock = jest.fn();
            const result = mapDispatchToProps(dispatchMock);
            result.getSessionsFromLocalStorage();
            expect(JSON.stringify(dispatchMock.mock.calls[0][0])).toEqual(
                JSON.stringify(getSessionsFromLocalStorage()),
            );
        });

        it('should dispatch giveStoryPoint when called', () => {
            const dispatchMock = jest.fn();
            const result = mapDispatchToProps(dispatchMock);
            result.giveStoryPoint(UserTypeEnum.DEVELOPER, 5);
            expect(JSON.stringify(dispatchMock.mock.calls[0][0])).toEqual(
                JSON.stringify(giveStoryPoint(UserTypeEnum.DEVELOPER, 5)),
            );
        });

        it('should dispatch setDeveloper when called', () => {
            const dispatchMock = jest.fn();
            const result = mapDispatchToProps(dispatchMock);
            result.setDeveloper('developerId');
            expect(JSON.stringify(dispatchMock.mock.calls[0][0])).toEqual(JSON.stringify(setDeveloper('developerId')));
        });

        it('should dispatch setNewDeveloper when called', () => {
            const dispatchMock = jest.fn();
            const result = mapDispatchToProps(dispatchMock);
            result.setNewDeveloper('developerId');
            expect(JSON.stringify(dispatchMock.mock.calls[0][0])).toEqual(
                JSON.stringify(setNewDeveloper('developerId')),
            );
        });

        it('should dispatch setSelecedSessionByUrl when called', () => {
            const dispatchMock = jest.fn();
            const result = mapDispatchToProps(dispatchMock);
            result.setSelecedSessionByUrl('sessionUrl');
            expect(JSON.stringify(dispatchMock.mock.calls[0][0])).toEqual(
                JSON.stringify(setSelecedSessionByUrl('sessionUrl')),
            );
        });
    });
});
