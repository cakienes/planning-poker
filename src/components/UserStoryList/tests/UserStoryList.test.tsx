import React from 'react';
import { createRenderer, ShallowRenderer } from 'react-test-renderer/shallow';
import IUserStoryListProps from '../interface/IUserStoryListProps';
import UserStoryList from '../UserStoryList';

describe('UserStoryList.tsx', () => {
    let renderer: ShallowRenderer;
    let userStoryListProps: IUserStoryListProps = {};

    beforeEach(() => {
        renderer = createRenderer();

        userStoryListProps = {
            selectedSession: undefined,
        };
    });

    it('renders correctly UserStoryList', async () => {
        expect(renderer.render(<UserStoryList {...userStoryListProps} />)).toMatchSnapshot();
    });

    it('renders correctly UserStoryList while selectedSession.userStories is empty', async () => {
        userStoryListProps = {
            selectedSession: {
                developers: [],
                id: 'id',
                numberOfVoters: 1,
                optionalUrl: undefined,
                sessionName: 'sessionName',
                userStories: [],
            },
        };
        expect(renderer.render(<UserStoryList {...userStoryListProps} />)).toMatchSnapshot();
    });

    it('renders correctly UserStoryList while selectedSession.userStories is not empty', async () => {
        userStoryListProps = {
            selectedSession: {
                developers: [],
                id: 'id',
                numberOfVoters: 1,
                optionalUrl: undefined,
                sessionName: 'sessionName',
                userStories: [
                    {
                        storyName: 'storyName',
                    },
                ],
            },
        };
        expect(renderer.render(<UserStoryList {...userStoryListProps} />)).toMatchSnapshot();
    });
});
