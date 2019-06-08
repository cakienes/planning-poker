import ISession from '../../interfaces/ISession';
import {
    ADD_SESSION,
    GET_SESSIONS_FROM_LOCAL_STORAGE,
    GIVE_STORY_POINT,
    SET_SELECTED_SESSION,
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

export const giveStoryPoint = (voterName: string, storyPoint: number) => (dispatch: Function) => {
    dispatch({
        type: GIVE_STORY_POINT,
        voterName: voterName.toUpperCase(),
        storyPoint,
    });
};
