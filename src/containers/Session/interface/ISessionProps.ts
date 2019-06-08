import { RouteComponentProps } from 'react-router';
import ISession from '../../../interfaces/ISession';

export default interface ISessionProps extends RouteComponentProps<any> {
    setSelectedSession: (id: string) => void;
    selectedSession?: ISession;
}
