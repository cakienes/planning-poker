import { RouteComponentProps } from 'react-router';
import ISession from '../../../../interfaces/ISession';
import IUserStory from '../../../../interfaces/IUserStory';

export default interface IActiveStoryProps extends RouteComponentProps<any> {
    activeUserStory?: IUserStory;
    selectedSession?: ISession;
    giveStoryPoint: (voterName: string, storyPoint: number) => void;
}
