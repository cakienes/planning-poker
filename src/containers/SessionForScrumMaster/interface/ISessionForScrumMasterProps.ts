import { RouteComponentProps } from 'react-router';
import { UserTypeEnum } from '../../../helper/Enum';
import ISession from '../../../interfaces/ISession';
import IUserStory from '../../../interfaces/IUserStory';

export default interface ISessionForScrumMasterProps extends RouteComponentProps<any> {
    activeUserStory?: IUserStory;
    getSessionsFromLocalStorage: () => void;
    giveStoryPoint: (userType: UserTypeEnum, storyPoint?: number) => void;
    selectedSession?: ISession;
    setSelectedSession: (id: string) => void;
}
