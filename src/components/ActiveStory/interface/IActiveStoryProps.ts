import { UserTypeEnum } from '../../../helper/Enum';
import ISession from '../../../interfaces/ISession';
import IUserStory from '../../../interfaces/IUserStory';

export default interface IActiveStoryProps {
    activeUserStory?: IUserStory;
    selectedSession?: ISession;
    giveStoryPoint: (userType: UserTypeEnum, storyPoint?: number) => void;

    type?: UserTypeEnum;

    developerId?: string;
}
