import { createSelector } from 'reselect';
import { UserStoryStatusEnum } from '../../helper/Enum';
import IGlobalState from '../../interfaces/IGlobalState';
import ISession from '../../interfaces/ISession';
import IUserStory from '../../interfaces/IUserStory';
import ISessionModel from './session.model';

export const getState = (state: IGlobalState): IGlobalState => state;
export const getSession = (state: IGlobalState): ISessionModel => state.session;

export const getSessions = createSelector(
    getSession,
    (session: ISessionModel) => {
        return session.sessions;
    },
);

export const getSelectedSessionId = createSelector(
    getSession,
    (session: ISessionModel) => {
        return session.selectedSessionId;
    },
);

export const getSelectedSession = createSelector(
    [getSessions, getSelectedSessionId],
    (sessions: ISession[] | undefined, selectedSessionId: string | undefined) => {
        if (sessions && selectedSessionId) {
            return sessions.find(x => x.id === selectedSessionId);
        }
        return undefined;
    },
);

export const getActiveUserStory = createSelector(
    getSelectedSession,
    (selectedSession?: ISession | undefined) => {
        if (selectedSession && selectedSession.userStories && selectedSession.userStories.length > 0) {
            return selectedSession.userStories.find((x: IUserStory) => x.status === UserStoryStatusEnum.ACTIVE);
        }
    },
);
