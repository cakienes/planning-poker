import { UserStoryStatusEnum, UserTypeEnum } from '../../../helper/Enum';
import ISession from '../../../interfaces/ISession';
import {
    ADD_SESSION,
    GET_SESSIONS_FROM_LOCAL_STORAGE,
    GIVE_STORY_POINT,
    SET_DEVELOPER,
    SET_FINAL_SCORE,
    SET_NEW_DEVELOPER,
    SET_SELECTED_SESSION,
    SET_SELECTED_SESSION_BY_URL,
} from '../session.constants';
import ISessionModel from '../session.model';
import SessionReducer from '../session.reducer';

describe('session.reducer.ts', () => {
    it('should return the initial state', () => {
        expect(SessionReducer(undefined, {})).toEqual({});
    });

    it('should handle GET_SESSIONS_FROM_LOCAL_STORAGE', () => {
        const initialState: ISessionModel = {};
        const action: any = { type: GET_SESSIONS_FROM_LOCAL_STORAGE };
        expect(SessionReducer(initialState, action)).toEqual({ sessions: [] });
    });

    it('should handle ADD_SESSION', () => {
        const initialState: ISessionModel = {};
        const dumSession: ISession = {
            developers: [],
            id: 'id',
            numberOfVoters: 1,
            optionalUrl: 'optionalUrl',
            sessionName: 'sessionName',
            userStories: [],
        };
        const action: any = { type: ADD_SESSION, session: dumSession };
        expect(SessionReducer(initialState, action)).toEqual({ sessions: [dumSession] });
    });

    it('should handle SET_SELECTED_SESSION', () => {
        const initialState: ISessionModel = {};
        const action: any = { type: SET_SELECTED_SESSION, id: 'id' };
        expect(SessionReducer(initialState, action)).toEqual({ selectedSessionId: 'id' });
    });

    it('should handle SET_SELECTED_SESSION_BY_URL while sessions is empty', () => {
        const initialState: ISessionModel = {
            sessions: [],
        };
        const action: any = { type: SET_SELECTED_SESSION_BY_URL, optionalUrl: 'optionalUrl' };
        expect(SessionReducer(initialState, action)).toEqual(initialState);
    });

    it('should handle SET_SELECTED_SESSION_BY_URL while sessions is empty', () => {
        const initialState: ISessionModel = {
            sessions: [
                {
                    developers: [],
                    id: 'id',
                    numberOfVoters: 1,
                    optionalUrl: 'optionalUrl',
                    sessionName: 'sessionName',
                    userStories: [],
                },
            ],
        };
        const action: any = { type: SET_SELECTED_SESSION_BY_URL, optionalUrl: 'optionalUrl' };
        expect(SessionReducer(initialState, action)).toEqual({ ...initialState, selectedSessionId: 'id' });
    });

    it('should handle GIVE_STORY_POINT while developerId doesnt exist in session', () => {
        const initialState: ISessionModel = {
            sessions: [
                {
                    developers: [],
                    id: 'id',
                    numberOfVoters: 1,
                    optionalUrl: 'optionalUrl',
                    sessionName: 'sessionName',
                    userStories: [],
                },
            ],
            developerId: 'developerId',
            selectedSessionId: 'id',
        };
        const action: any = { type: GIVE_STORY_POINT, voterName: UserTypeEnum.DEVELOPER };
        expect(SessionReducer(initialState, action)).toEqual(initialState);
    });

    it('should handle GIVE_STORY_POINT while developerId exist in session & no voters', () => {
        const initialState: ISessionModel = {
            sessions: [
                {
                    developers: ['developerId'],
                    id: 'id',
                    numberOfVoters: 1,
                    optionalUrl: 'optionalUrl',
                    sessionName: 'sessionName',
                    userStories: [
                        {
                            status: UserStoryStatusEnum.ACTIVE,
                            storyName: 'storyName',
                        },
                    ],
                },
            ],
            developerId: 'developerId',
            selectedSessionId: 'id',
        };

        const action: any = { type: GIVE_STORY_POINT, voterName: UserTypeEnum.DEVELOPER, storyPoint: 5 };

        const expectedState: ISessionModel = {
            sessions: [
                {
                    developers: ['developerId'],
                    id: 'id',
                    numberOfVoters: 1,
                    optionalUrl: 'optionalUrl',
                    sessionName: 'sessionName',
                    userStories: [
                        {
                            status: UserStoryStatusEnum.ACTIVE,
                            storyName: 'storyName',
                            voters: [{ storyPoint: 5, voterName: 'developerId' }],
                        },
                    ],
                },
            ],
            developerId: 'developerId',
            selectedSessionId: 'id',
        };
        expect(SessionReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle GIVE_STORY_POINT while developerId exist in session & didnt vote yet', () => {
        const initialState: ISessionModel = {
            sessions: [
                {
                    developers: ['developerId'],
                    id: 'id',
                    numberOfVoters: 1,
                    optionalUrl: 'optionalUrl',
                    sessionName: 'sessionName',
                    userStories: [
                        {
                            status: UserStoryStatusEnum.ACTIVE,
                            storyName: 'storyName',
                            voters: [{ storyPoint: 5, voterName: 'developerId2' }],
                        },
                    ],
                },
            ],
            developerId: 'developerId',
            selectedSessionId: 'id',
        };

        const action: any = { type: GIVE_STORY_POINT, voterName: UserTypeEnum.DEVELOPER, storyPoint: 5 };

        const expectedState: ISessionModel = {
            sessions: [
                {
                    developers: ['developerId'],
                    id: 'id',
                    numberOfVoters: 1,
                    optionalUrl: 'optionalUrl',
                    sessionName: 'sessionName',
                    userStories: [
                        {
                            status: UserStoryStatusEnum.ACTIVE,
                            storyName: 'storyName',
                            voters: [
                                { storyPoint: 5, voterName: 'developerId2' },
                                { storyPoint: 5, voterName: 'developerId' },
                            ],
                        },
                    ],
                },
            ],
            developerId: 'developerId',
            selectedSessionId: 'id',
        };
        expect(SessionReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle GIVE_STORY_POINT while developerId exist in session & already voted', () => {
        const initialState: ISessionModel = {
            sessions: [
                {
                    developers: ['developerId'],
                    id: 'id',
                    numberOfVoters: 1,
                    optionalUrl: 'optionalUrl',
                    sessionName: 'sessionName',
                    userStories: [
                        {
                            status: UserStoryStatusEnum.ACTIVE,
                            storyName: 'storyName',
                            voters: [{ storyPoint: 5, voterName: 'developerId' }],
                        },
                    ],
                },
            ],
            developerId: 'developerId',
            selectedSessionId: 'id',
        };

        const action: any = { type: GIVE_STORY_POINT, voterName: UserTypeEnum.DEVELOPER, storyPoint: 9 };

        const expectedState: ISessionModel = {
            sessions: [
                {
                    developers: ['developerId'],
                    id: 'id',
                    numberOfVoters: 1,
                    optionalUrl: 'optionalUrl',
                    sessionName: 'sessionName',
                    userStories: [
                        {
                            status: UserStoryStatusEnum.ACTIVE,
                            storyName: 'storyName',
                            voters: [{ storyPoint: 9, voterName: 'developerId' }],
                        },
                    ],
                },
            ],
            developerId: 'developerId',
            selectedSessionId: 'id',
        };
        expect(SessionReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle SET_NEW_DEVELOPER', () => {
        const initialState: ISessionModel = {
            sessions: [
                {
                    developers: [],
                    id: 'id',
                    numberOfVoters: 1,
                    optionalUrl: 'optionalUrl',
                    sessionName: 'sessionName',
                    userStories: [],
                },
            ],
            selectedSessionId: 'id',
        };

        const action: any = { type: SET_NEW_DEVELOPER, guid: 'developerId' };

        const expectedState: ISessionModel = {
            sessions: [
                {
                    developers: ['developerId'],
                    id: 'id',
                    numberOfVoters: 1,
                    optionalUrl: 'optionalUrl',
                    sessionName: 'sessionName',
                    userStories: [],
                },
            ],
            developerId: 'developerId',
            selectedSessionId: 'id',
        };

        expect(SessionReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle SET_DEVELOPER', () => {
        const initialState: ISessionModel = {};

        const action: any = { type: SET_DEVELOPER, developerId: 'developerId' };

        const expectedState: ISessionModel = {
            developerId: 'developerId',
        };

        expect(SessionReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle SET_FINAL_SCORE', () => {
        const initialState: ISessionModel = {
            sessions: [
                {
                    developers: ['developerId'],
                    id: 'id',
                    numberOfVoters: 1,
                    optionalUrl: 'optionalUrl',
                    sessionName: 'sessionName',
                    userStories: [
                        {
                            status: UserStoryStatusEnum.ACTIVE,
                            storyName: 'storyName',
                            voters: [{ storyPoint: 5, voterName: 'developerId' }],
                        },
                        {
                            status: UserStoryStatusEnum.NOT_VOTED,
                            storyName: 'storyName2',
                        },
                    ],
                },
            ],
            developerId: 'developerId',
            selectedSessionId: 'id',
        };

        const action: any = { type: SET_FINAL_SCORE, finalScore: '13' };

        const expectedState: ISessionModel = {
            sessions: [
                {
                    developers: ['developerId'],
                    id: 'id',
                    numberOfVoters: 1,
                    optionalUrl: 'optionalUrl',
                    sessionName: 'sessionName',
                    userStories: [
                        {
                            status: UserStoryStatusEnum.VOTED,
                            storyName: 'storyName',
                            voters: [{ storyPoint: 5, voterName: 'developerId' }],
                            storyPoint: '13',
                        },
                        {
                            status: UserStoryStatusEnum.ACTIVE,
                            storyName: 'storyName2',
                        },
                    ],
                },
            ],
            developerId: 'developerId',
            selectedSessionId: 'id',
        };

        expect(SessionReducer(initialState, action)).toEqual(expectedState);
    });
});
