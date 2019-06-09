import React from 'react';
import { toastr } from 'react-redux-toastr';
import { createRenderer, ShallowRenderer } from 'react-test-renderer/shallow';
import uuid from 'uuid';
import { UserStoryStatusEnum } from '../../../helper/Enum';
import ISession from '../../../interfaces/ISession';
import { createSession } from '../../../redux/session/session.actions';
import { CreateSession, mapDispatchToProps } from '../CreateSession';
import ICreateSessionProps from '../interface/ICreateSessionProps';

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

describe('CreateSession.tsx', () => {
    let renderer: ShallowRenderer;
    const createSessionMock = jest.fn();
    const dumData: any = '';

    let appProps: ICreateSessionProps = {
        createSession: createSessionMock,
        history: {
            push: jest.fn(),
        } as any,
        location: dumData,
        match: dumData,
        staticContext: dumData,
    };

    beforeEach(() => {
        renderer = createRenderer();
        appProps = {
            createSession: createSessionMock,
            history: dumData,
            location: dumData,
            match: dumData,
            staticContext: dumData,
        };
    });

    it('renders correctly CreateSession', async () => {
        expect(renderer.render(<CreateSession {...appProps} />)).toMatchSnapshot();
    });

    it('onSubmit of CreateSession while values is not null', async () => {
        appProps = {
            ...appProps,
            history: {
                ...appProps.history,
                push: jest.fn(),
            },
        };
        renderer.render(<CreateSession {...appProps} />);
        const instance: any = renderer.getMountedInstance();

        const dumSessionValues: any = {
            numberOfVoters: 2,
            optionalUrl: undefined,
            sessionName: 'sessionName',
            userStories: 'userStories1\nUserStories2',
        };

        const dumSession: ISession = {
            numberOfVoters: 2,
            optionalUrl: undefined,
            sessionName: 'sessionName',
            developers: [],
            id: uuid(),
            userStories: [
                { storyName: 'userStories1', status: UserStoryStatusEnum.ACTIVE },
                { storyName: 'UserStories2', status: UserStoryStatusEnum.NOT_VOTED },
            ],
        };

        instance.onSubmit(dumSessionValues);

        expect(createSessionMock).toHaveBeenCalledWith(dumSession);
        expect(appProps.history.push).toHaveBeenCalledWith(`/session/${dumSession.id}/scrum-master`);
    });

    it('onSubmit of CreateSession while values is null', async () => {
        renderer.render(<CreateSession {...appProps} />);
        const instance: any = renderer.getMountedInstance();

        instance.onSubmit(null);
        expect(toastr.error).toHaveBeenCalledWith('Validation Error', 'Please fill the form');
    });

    describe('mapDispatchToProps of CreateSession', () => {
        it('should dispatch getLinksFromLocalStorage when called', () => {
            const dispatchMock = jest.fn();
            const result = mapDispatchToProps(dispatchMock);

            const dumSession: ISession = {
                numberOfVoters: 2,
                optionalUrl: undefined,
                sessionName: 'sessionName',
                developers: [],
                id: uuid(),
                userStories: [
                    { storyName: 'userStories1', status: UserStoryStatusEnum.ACTIVE },
                    { storyName: 'UserStories2', status: UserStoryStatusEnum.NOT_VOTED },
                ],
            };

            result.createSession(dumSession);

            expect(JSON.stringify(dispatchMock.mock.calls[0][0])).toEqual(JSON.stringify(createSession(dumSession)));
        });
    });
});
