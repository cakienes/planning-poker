import ISessionModel from '../redux/session/session.model';

export default interface IGlobalState {
    session: ISessionModel;
    form?: any;
    toastr?: any;
}
