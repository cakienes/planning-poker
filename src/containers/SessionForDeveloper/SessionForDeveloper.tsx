import React from 'react';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import { withRouter } from 'react-router-dom';
import uuid from 'uuid';
import ActiveStory from '../../components/ActiveStory/ActiveStory';
import UserStoryList from '../../components/UserStoryList/UserStoryList';
import { UserTypeEnum } from '../../helper/Enum';
import IGlobalState from '../../interfaces/IGlobalState';
import ISession from '../../interfaces/ISession';
import {
    getSessionsFromLocalStorage,
    giveStoryPoint,
    setDeveloper,
    setNewDeveloper,
    setSelecedSessionByUrl,
    setSelectedSession,
} from '../../redux/session/session.actions';
import { getActiveUserStory, getSelectedSession } from '../../redux/session/session.selectors';
import Layout from '../Layout/Layout';
import ISessionForDeveloperProps from './interface/ISessionForDeveloperProps';

export class SessionForDeveloper extends React.Component<ISessionForDeveloperProps, any> {
    constructor(props: ISessionForDeveloperProps) {
        super(props);
        this.state = {};
    }
    componentWillMount() {
        const {
            match: {
                params: { id, optionalUrl },
            },
        } = this.props;
        if (id) {
            this.props.setSelectedSession(id);
        } else if (optionalUrl) {
            this.props.setSelecedSessionByUrl(optionalUrl);
        }
    }

    componentWillReceiveProps(nextProps: ISessionForDeveloperProps) {
        if (!this.props.selectedSession && nextProps.selectedSession && nextProps.selectedSession.id) {
            this.checkSessionAvailability(nextProps.selectedSession);
        }
    }

    componentDidMount(): any {
        setInterval(this.reRenderComponent, 1000);
    }

    render() {
        const {
            selectedSession,
            activeUserStory,
            match: {
                params: { developerId },
            },
        } = this.props;
        return (
            <Layout>
                <div className="session">
                    <div className="row">
                        <div className="col">
                            <UserStoryList selectedSession={selectedSession} />
                        </div>
                        <div className="col-4">
                            <ActiveStory
                                selectedSession={selectedSession}
                                giveStoryPoint={this.props.giveStoryPoint}
                                activeUserStory={activeUserStory}
                                type={UserTypeEnum.DEVELOPER}
                                developerId={developerId}
                            />
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }

    checkSessionAvailability = (selectedSession: ISession): boolean => {
        const {
            match: {
                params: { developerId },
            },
        } = this.props;
        if (!selectedSession) {
            toastr.error('SESSION NOT FOUND', '');
        } else if (developerId) {
            if (!selectedSession.developers.find((x: string) => x === developerId)) {
                this.props.history.push('/session-error');
            } else {
                this.props.setDeveloper(developerId);
            }
        } else if (!developerId) {
            if (selectedSession.developers.length < selectedSession.numberOfVoters) {
                const guid = uuid();
                this.props.history.replace(`/session/${selectedSession.id}/developer/${guid}`);
                this.props.setNewDeveloper(guid);
                return true;
            } else {
                this.props.history.push('/session-error');
            }
        }
        return false;
    };

    reRenderComponent = (): void => {
        this.props.getSessionsFromLocalStorage();
    };
}

const mapStateToProps = (state: IGlobalState) => ({
    activeUserStory: getActiveUserStory(state),
    selectedSession: getSelectedSession(state),
});

export const mapDispatchToProps = (dispatch: Function) => {
    return {
        setSelectedSession: (id: string) => {
            dispatch(setSelectedSession(id));
        },
        giveStoryPoint: (userType: UserTypeEnum, storyPoint?: number) => {
            dispatch(giveStoryPoint(userType, storyPoint));
        },
        setNewDeveloper: (guid: string) => {
            dispatch(setNewDeveloper(guid));
        },
        setDeveloper: (developerId: string) => {
            dispatch(setDeveloper(developerId));
        },
        getSessionsFromLocalStorage: () => {
            dispatch(getSessionsFromLocalStorage());
        },
        setSelecedSessionByUrl: (optionalUrl: string) => {
            dispatch(setSelecedSessionByUrl(optionalUrl));
        },
    };
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(SessionForDeveloper),
);
