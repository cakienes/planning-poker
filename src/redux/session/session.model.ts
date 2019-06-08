import ISession from '../../interfaces/ISession';

export default interface ISessionModel {
    sessions?: ISession[];
    selectedSessionId?: string;
    developerId?: string;
}
