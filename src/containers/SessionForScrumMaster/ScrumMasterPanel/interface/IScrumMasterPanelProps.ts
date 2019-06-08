import ISession from '../../../../interfaces/ISession';
import IUserStory from '../../../../interfaces/IUserStory';

export default interface IScrumMasterPanelProps {
    activeUserStory?: IUserStory;
    selectedSession?: ISession;
    setFinalScore: (finalScore: string) => void;
}
