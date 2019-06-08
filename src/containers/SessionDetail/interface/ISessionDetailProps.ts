import { RouteComponentProps } from 'react-router';
import ISession from '../../../interfaces/ISession';

export default interface ISessionDetailProps extends RouteComponentProps<any> {
    setSelectedSession: (id: string) => void;
    selectedSession?: ISession;
}
