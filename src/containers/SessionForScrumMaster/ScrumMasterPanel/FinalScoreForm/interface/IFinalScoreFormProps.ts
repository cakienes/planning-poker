import IUserStory from '../../../../../interfaces/IUserStory';

export default interface IFinalScoreFormProps {
    handleSubmit?: (values: any) => void;
    activeUserStory?: IUserStory;
}
