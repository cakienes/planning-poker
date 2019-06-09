import IVoter from './IVoter';

export default interface IUserStory {
    storyName: string;
    storyPoint?: string;
    status?: string;

    voters?: IVoter[];
}
