import IVoter from './IVoter';

export default interface IUserStory {
    storyName: string;
    storyPoint?: number;
    status?: string;

    voters?: IVoter[];
}
