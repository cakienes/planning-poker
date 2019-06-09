import React from 'react';
import { createRenderer, ShallowRenderer } from 'react-test-renderer/shallow';
import { UserTypeEnum } from '../../../helper/Enum';
import ActiveStory from '../ActiveStory';
import IActiveStoryProps from '../interface/IActiveStoryProps';

describe('ActiveStory.tsx', () => {
    let renderer: ShallowRenderer;

    const giveStoryPointMock = jest.fn();
    let activeStoryProps: IActiveStoryProps = { giveStoryPoint: giveStoryPointMock };

    beforeEach(() => {
        renderer = createRenderer();

        activeStoryProps = {
            ...activeStoryProps,
            activeUserStory: undefined,
            developerId: undefined,
            selectedSession: undefined,
            type: undefined,
        };
    });

    it('renders correctly ActiveStory', async () => {
        expect(renderer.render(<ActiveStory {...activeStoryProps} />)).toMatchSnapshot();
    });

    it('renders correctly while activeUserStory', async () => {
        activeStoryProps = {
            ...activeStoryProps,
            activeUserStory: {
                storyName: 'storyName',
            },
        };
        expect(renderer.render(<ActiveStory {...activeStoryProps} />)).toMatchSnapshot();
    });

    it('renders correctly while this.getMyStoryPoint return undefined', async () => {
        renderer.render(<ActiveStory {...activeStoryProps} />);
        const instance: any = renderer.getMountedInstance();
        instance.getMyStoryPoint = jest.fn().mockReturnValue(undefined);

        expect(instance.render()).toMatchSnapshot();
    });

    it('renders correctly while this.getMyStoryPoint return 1', async () => {
        renderer.render(<ActiveStory {...activeStoryProps} />);
        const instance: any = renderer.getMountedInstance();
        instance.getMyStoryPoint = jest.fn().mockReturnValue(1);

        expect(instance.render()).toMatchSnapshot();
    });

    it('giveStoryPoint of ActiveStory while tpye is undefined', async () => {
        renderer.render(<ActiveStory {...activeStoryProps} />);
        const instance: any = renderer.getMountedInstance();

        instance.giveStoryPoint();

        expect(giveStoryPointMock).not.toHaveBeenCalled();
    });

    it('giveStoryPoint of ActiveStory while tpye is SCRUM_MASTER', async () => {
        activeStoryProps = {
            ...activeStoryProps,
            type: UserTypeEnum.SCRUM_MASTER,
        };
        renderer.render(<ActiveStory {...activeStoryProps} />);
        const instance: any = renderer.getMountedInstance();

        instance.giveStoryPoint('value');

        expect(giveStoryPointMock).toHaveBeenCalledWith(UserTypeEnum.SCRUM_MASTER, 'value');
    });

    it('getMyStoryPoint of ActiveStory while activeUserStory is undefined', async () => {
        renderer.render(<ActiveStory {...activeStoryProps} />);
        const instance: any = renderer.getMountedInstance();

        expect(instance.getMyStoryPoint()).toEqual(-1);
    });

    it('getMyStoryPoint of ActiveStory while activeUserStory is not undefined & activeUserStory.voters is undefined', async () => {
        activeStoryProps = {
            ...activeStoryProps,
            activeUserStory: {
                storyName: 'storyName',
            },
        };
        renderer.render(<ActiveStory {...activeStoryProps} />);
        const instance: any = renderer.getMountedInstance();

        expect(instance.getMyStoryPoint()).toEqual(-1);
    });

    it('getMyStoryPoint of ActiveStory while voters empty', async () => {
        activeStoryProps = {
            ...activeStoryProps,
            activeUserStory: {
                storyName: 'storyName',
                voters: [
                    {
                        voterName: 'developerId',
                        storyPoint: 1,
                    },
                ],
            },
            developerId: 'developerId',
        };
        renderer.render(<ActiveStory {...activeStoryProps} />);
        const instance: any = renderer.getMountedInstance();

        expect(instance.getMyStoryPoint()).toEqual(1);
    });

    it('getMyStoryPoint of ActiveStory while voters empty', async () => {
        activeStoryProps = {
            ...activeStoryProps,
            activeUserStory: {
                storyName: 'storyName',
                voters: [
                    {
                        voterName: UserTypeEnum.SCRUM_MASTER,
                        storyPoint: 2,
                    },
                ],
            },
        };
        renderer.render(<ActiveStory {...activeStoryProps} />);
        const instance: any = renderer.getMountedInstance();

        expect(instance.getMyStoryPoint()).toEqual(2);
    });
});
