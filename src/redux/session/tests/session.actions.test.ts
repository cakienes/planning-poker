import ISession from '../../../interfaces/ISession';
import {
    createSession,
    getSessionsFromLocalStorage,
    giveStoryPoint,
    setDeveloper,
    setFinalScore,
    setNewDeveloper,
    setSelecedSessionByUrl,
    setSelectedSession,
} from '../session.actions';
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

describe('session.actions.ts', () => {
    let dispatchMock: Function;

    beforeEach(() => {
        dispatchMock = jest.fn();
    });

    it('has a type of ADD_SESSION', () => {
        const dumSession: ISession = {
            developers: [],
            id: 'id',
            numberOfVoters: 1,
            optionalUrl: 'optionalUrl',
            sessionName: 'sessionName',
            userStories: [],
        };
        const expected = {
            type: ADD_SESSION,
            session: dumSession,
        };

        createSession(dumSession)(dispatchMock);

        expect(dispatchMock).toHaveBeenCalledWith(expected);
    });

    it('has a type of GET_SESSIONS_FROM_LOCAL_STORAGE', () => {
        const expected = {
            type: GET_SESSIONS_FROM_LOCAL_STORAGE,
        };

        getSessionsFromLocalStorage()(dispatchMock);

        expect(dispatchMock).toHaveBeenCalledWith(expected);
    });

    it('has a type of GIVE_STORY_POINT', () => {
        const dumVoterName = 'id';
        const dumStoryPoint = 5;
        const expected = {
            type: GIVE_STORY_POINT,
            voterName: dumVoterName,
            storyPoint: dumStoryPoint,
        };

        giveStoryPoint(dumVoterName, dumStoryPoint)(dispatchMock);

        expect(dispatchMock).toHaveBeenCalledWith(expected);
    });

    it('has a type of SET_DEVELOPER', () => {
        const dumDeveloperId = 'id';
        const expected = {
            type: SET_DEVELOPER,
            developerId: dumDeveloperId,
        };

        setDeveloper(dumDeveloperId)(dispatchMock);

        expect(dispatchMock).toHaveBeenCalledWith(expected);
    });

    it('has a type of SET_FINAL_SCORE', () => {
        const dumFinalScore = '5';
        const expected = {
            type: SET_FINAL_SCORE,
            finalScore: dumFinalScore,
        };

        setFinalScore(dumFinalScore)(dispatchMock);

        expect(dispatchMock).toHaveBeenCalledWith(expected);
    });

    it('has a type of SET_NEW_DEVELOPER', () => {
        const dumGuid = 'id';
        const expected = {
            type: SET_NEW_DEVELOPER,
            guid: dumGuid,
        };

        setNewDeveloper(dumGuid)(dispatchMock);

        expect(dispatchMock).toHaveBeenCalledWith(expected);
    });

    it('has a type of SET_SELECTED_SESSION_BY_URL', () => {
        const dumOptionalUrl = 'optionalUrl';
        const expected = {
            type: SET_SELECTED_SESSION_BY_URL,
            optionalUrl: dumOptionalUrl,
        };

        setSelecedSessionByUrl(dumOptionalUrl)(dispatchMock);

        expect(dispatchMock).toHaveBeenCalledWith(expected);
    });

    it('has a type of SET_SELECTED_SESSION', () => {
        const dumId = 'id';
        const expected = {
            type: SET_SELECTED_SESSION,
            id: dumId,
        };

        setSelectedSession(dumId)(dispatchMock);

        expect(dispatchMock).toHaveBeenCalledWith(expected);
    });
});
