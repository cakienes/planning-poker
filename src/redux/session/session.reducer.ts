import { UserStoryStatusEnum, UserTypeEnum } from '../../helper/Enum';
import ISession from '../../interfaces/ISession';
import LocalStorageService from '../../services/LocalStorageService';
import * as SessionConstants from './session.constants';
import ISessionModel from './session.model';

export default function SessionReducer(state: ISessionModel = {}, action: any) {
    switch (action.type) {
        case SessionConstants.GET_SESSIONS_FROM_LOCAL_STORAGE: {
            return {
                ...state,
                sessions: LocalStorageService.getSessions(),
            };
        }
        case SessionConstants.ADD_SESSION: {
            const sessions: ISession[] = Object.assign([], state.sessions);
            sessions.push(action.session);
            LocalStorageService.setSessions(sessions);
            return {
                ...state,
                sessions,
            };
        }
        case SessionConstants.SET_SELECTED_SESSION: {
            return {
                ...state,
                selectedSessionId: action.id,
            };
        }
        case SessionConstants.GIVE_STORY_POINT: {
            const sessions: ISession[] = Object.assign([], state.sessions);
            const sessionIndex = sessions.findIndex(x => x.id === state.selectedSessionId);
            if (sessionIndex !== -1) {
                const selectedSession = Object.assign({}, sessions[sessionIndex]);
                if (
                    action.voterName === UserTypeEnum.DEVELOPER &&
                    !selectedSession.developers.find(x => x === state.developerId)
                ) {
                    return state;
                }

                const storyIndex = selectedSession.userStories.findIndex(x => x.status === UserStoryStatusEnum.ACTIVE);

                if (storyIndex !== -1) {
                    const activeStory = Object.assign({}, selectedSession.userStories[storyIndex]);
                    let voterId: string = UserTypeEnum.SCRUM_MASTER;
                    if (action.voterName === UserTypeEnum.DEVELOPER && state.developerId) {
                        voterId = state.developerId;
                    }
                    if (activeStory.voters) {
                        const voterIndex: number = activeStory.voters.findIndex(x => x.voterName === voterId);
                        if (voterIndex === -1) {
                            activeStory.voters.push({
                                storyPoint: action.storyPoint,
                                voterName: voterId,
                            });
                        } else {
                            activeStory.voters[voterIndex] = {
                                storyPoint: action.storyPoint,
                                voterName: voterId,
                            };
                        }
                    } else {
                        activeStory.voters = [
                            {
                                storyPoint: action.storyPoint,
                                voterName: voterId,
                            },
                        ];
                    }

                    selectedSession.userStories[storyIndex] = activeStory;
                }

                sessions[sessionIndex] = selectedSession;
                LocalStorageService.setSessions(sessions);
            }
            return { ...state, sessions };
        }
        case SessionConstants.SET_NEW_DEVELOPER: {
            const sessions: ISession[] = Object.assign([], state.sessions);
            const sessionIndex = sessions.findIndex(x => x.id === state.selectedSessionId);
            sessions[sessionIndex].developers.push(action.guid);
            sessions[sessionIndex] = {
                ...sessions[sessionIndex],
            };

            LocalStorageService.setSessions(sessions);
            return {
                ...state,
                developerId: action.guid,
                sessions,
            };
        }
        case SessionConstants.SET_DEVELOPER: {
            return {
                ...state,
                developerId: action.developerId,
            };
        }
        default: {
            return state;
        }
    }
}
