import React from 'react';
import { createRenderer, ShallowRenderer } from 'react-test-renderer/shallow';
import { setFinalScore } from '../../../../redux/session/session.actions';
import IScrumMasterPanelProps from '../interface/IScrumMasterPanelProps';
import { mapDispatchToProps, ScrumMasterPanel } from '../ScrumMasterPanel';

describe('ScrumMasterPanel.tsx', () => {
    let renderer: ShallowRenderer;
    const setFinalScoreMock = jest.fn();

    let scrumMasterPanelProps: IScrumMasterPanelProps = {} as any;

    beforeEach(() => {
        renderer = createRenderer();
        scrumMasterPanelProps = {
            setFinalScore: setFinalScoreMock,
            activeUserStory: undefined,
            selectedSession: undefined,
        };
    });

    it('renders correctly ScrumMasterPanel', async () => {
        expect(renderer.render(<ScrumMasterPanel {...scrumMasterPanelProps} />)).toMatchSnapshot();
    });

    it('renders correctly ScrumMasterPanel while activeUserStory is defined', async () => {
        scrumMasterPanelProps = {
            ...scrumMasterPanelProps,
            activeUserStory: {
                storyName: 'storyName',
            },
        };
        expect(renderer.render(<ScrumMasterPanel {...scrumMasterPanelProps} />)).toMatchSnapshot();
    });

    it('renderVoters of ScrumMasterPanel while selectedSession && activeUserStory is defined', async () => {
        scrumMasterPanelProps = {
            ...scrumMasterPanelProps,
            activeUserStory: {
                storyName: 'storyName',
            },
            selectedSession: {
                developers: ['developerId', 'developerId2'],
                id: 'id',
                numberOfVoters: 2,
                optionalUrl: 'optionalUrl',
                sessionName: 'sessionName',
                userStories: [
                    {
                        storyName: 'storyName',
                    },
                ],
            },
        };
        renderer.render(<ScrumMasterPanel {...scrumMasterPanelProps} />);
        const instance: any = renderer.getMountedInstance();

        expect(instance.renderVoters()).toMatchSnapshot();
    });

    it('getVoteNumber of ScrumMasterPanel while VOTED', async () => {
        scrumMasterPanelProps = {
            ...scrumMasterPanelProps,
            activeUserStory: {
                storyName: 'storyName',
                voters: [{ voterName: 'developerId', storyPoint: 5 }],
            },
            selectedSession: {
                developers: ['developerId', 'developerId2'],
                id: 'id',
                numberOfVoters: 2,
                optionalUrl: 'optionalUrl',
                sessionName: 'sessionName',
                userStories: [
                    {
                        storyName: 'storyName',
                        voters: [{ voterName: 'developerId', storyPoint: 5 }],
                    },
                ],
            },
        };
        renderer.render(<ScrumMasterPanel {...scrumMasterPanelProps} />);
        const instance: any = renderer.getMountedInstance();

        expect(instance.getVoteNumber('developerId')).toEqual('Voted');
    });

    it('getVoteNumber of ScrumMasterPanel while NOT_VOTED', async () => {
        scrumMasterPanelProps = {
            ...scrumMasterPanelProps,
            activeUserStory: {
                storyName: 'storyName',
                voters: [{ voterName: 'developerId', storyPoint: 5 }],
            },
            selectedSession: {
                developers: ['developerId', 'developerId2'],
                id: 'id',
                numberOfVoters: 2,
                optionalUrl: 'optionalUrl',
                sessionName: 'sessionName',
                userStories: [
                    {
                        storyName: 'storyName',
                        voters: [{ voterName: 'developerId', storyPoint: 5 }],
                    },
                ],
            },
        };
        renderer.render(<ScrumMasterPanel {...scrumMasterPanelProps} />);
        const instance: any = renderer.getMountedInstance();

        expect(instance.getVoteNumber('developerId2')).toEqual('Not Voted');
    });

    it('getVoteNumber of ScrumMasterPanel while all VOTED', async () => {
        scrumMasterPanelProps = {
            ...scrumMasterPanelProps,
            activeUserStory: {
                storyName: 'storyName',
                voters: [
                    { voterName: 'developerId', storyPoint: 0 },
                    { voterName: 'developerId2', storyPoint: 5 },
                    { voterName: 'SCRUM_MASTER', storyPoint: 5 },
                ],
            },
            selectedSession: {
                developers: ['developerId', 'developerId2'],
                id: 'id',
                numberOfVoters: 2,
                optionalUrl: 'optionalUrl',
                sessionName: 'sessionName',
                userStories: [
                    {
                        storyName: 'storyName',
                        voters: [
                            { voterName: 'developerId', storyPoint: 0 },
                            { voterName: 'developerId2', storyPoint: 5 },
                            { voterName: 'SCRUM_MASTER', storyPoint: 5 },
                        ],
                    },
                ],
            },
        };
        renderer.render(<ScrumMasterPanel {...scrumMasterPanelProps} />);
        const instance: any = renderer.getMountedInstance();

        expect(instance.getVoteNumber('developerId')).toEqual('?');
        expect(instance.getVoteNumber('SCRUM_MASTER')).toEqual('5');
    });

    it('setFinalScore of ScrumMasterPanel ', async () => {
        renderer.render(<ScrumMasterPanel {...scrumMasterPanelProps} />);
        const instance: any = renderer.getMountedInstance();

        const dumValues = {
            finalScore: '5',
        };
        instance.setFinalScore(dumValues);

        expect(setFinalScoreMock).toHaveBeenCalledWith('5');
    });

    describe('mapDispatchToProps', () => {
        it('should dispatch getSessionsFromLocalStorage when called', () => {
            const dispatchMock = jest.fn();
            const result = mapDispatchToProps(dispatchMock);
            result.setFinalScore('13');
            expect(JSON.stringify(dispatchMock.mock.calls[0][0])).toEqual(JSON.stringify(setFinalScore('13')));
        });
    });
});
