import { UserStoryStatusEnum } from '../../../helper/Enum';
import IGlobalState from '../../../interfaces/IGlobalState';
import { getActiveUserStory, getState } from '../session.selectors';

describe('session.selectors.ts', () => {
    let dumState: IGlobalState = {} as any;

    beforeEach(() => {
        dumState = {
            session: {
                developerId: 'developerId',
                selectedSessionId: 'selectedSessionId',
                sessions: [
                    {
                        developers: [],
                        id: 'selectedSessionId',
                        numberOfVoters: 1,
                        optionalUrl: 'optionalUrl',
                        sessionName: 'sessionName',
                        userStories: [
                            {
                                status: UserStoryStatusEnum.ACTIVE,
                                storyName: 'storyName',
                            },
                            {
                                status: UserStoryStatusEnum.NOT_VOTED,
                                storyName: 'storyName2',
                            },
                        ],
                    },
                ],
            },
        };
    });

    it('should return getState ', () => {
        expect(getState(dumState)).toEqual(dumState);
    });
    it('should return getActiveUserStory', () => {
        expect(getActiveUserStory(dumState)).toEqual({
            status: UserStoryStatusEnum.ACTIVE,
            storyName: 'storyName',
        });
    });

    it('should return getSelectedSession ', () => {
        dumState = {
            ...dumState,
            session: {
                ...dumState.session,
                selectedSessionId: undefined,
            },
        };
        expect(getActiveUserStory(dumState)).toEqual(undefined);
    });
});
