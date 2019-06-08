import { RouteComponentProps } from 'react-router';
import ISession from '../../../interfaces/ISession';

export default interface ICreateSessionProps extends RouteComponentProps<any> {
    createSession: (values: ISession) => void;
}
