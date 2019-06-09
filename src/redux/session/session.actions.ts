import ISession from '../../interfaces/ISession';
import {
    ADD_SESSION,
    GET_SESSIONS_FROM_LOCAL_STORAGE,
    GIVE_STORY_POINT,
    SET_DEVELOPER,
    SET_FINAL_SCORE,
    SET_NEW_DEVELOPER,
    SET_SELECTED_SESSION,
    SET_SELECTED_SESSION_BY_URL,
} from './session.constants';

export const getSessionsFromLocalStorage = () => (dispatch: Function) => {
    dispatch({
        type: GET_SESSIONS_FROM_LOCAL_STORAGE,
    });
};

export const createSession = (session: ISession) => (dispatch: Function) => {
    dispatch({
        type: ADD_SESSION,
        session,
    });
};
export const setSelectedSession = (id: string) => (dispatch: Function) => {
    dispatch({
        type: SET_SELECTED_SESSION,
        id,
    });
};

export const giveStoryPoint = (voterName: string, storyPoint?: number) => (dispatch: Function) => {
    dispatch({
        type: GIVE_STORY_POINT,
        voterName,
        storyPoint,
    });
};

export const setNewDeveloper = (guid: string) => (dispatch: Function) => {
    dispatch({
        type: SET_NEW_DEVELOPER,
        guid,
    });
};
export const setDeveloper = (developerId: string) => (dispatch: Function) => {
    dispatch({
        type: SET_DEVELOPER,
        developerId,
    });
};
export const setFinalScore = (finalScore: string) => (dispatch: Function) => {
    dispatch({
        type: SET_FINAL_SCORE,
        finalScore,
    });
};
export const setSelecedSessionByUrl = (optionalUrl: string) => (dispatch: Function) => {
    dispatch({
        type: SET_SELECTED_SESSION_BY_URL,
        optionalUrl,
    });
};
