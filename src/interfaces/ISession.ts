import IUserStory from './IUserStory';

export default interface ISession {
    id: string;
    sessionName: string;
    numberOfVoters: number;
    userStories: IUserStory[];

    developers: string[];
}
