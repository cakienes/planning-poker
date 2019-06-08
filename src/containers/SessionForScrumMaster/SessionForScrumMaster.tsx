import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ActiveStory from '../../components/ActiveStory/ActiveStory';
import UserStoryList from '../../components/UserStoryList/UserStoryList';
import { UserTypeEnum } from '../../helper/Enum';
import IGlobalState from '../../interfaces/IGlobalState';
import { getSessionsFromLocalStorage, giveStoryPoint, setSelectedSession } from '../../redux/session/session.actions';
import { getActiveUserStory, getSelectedSession } from '../../redux/session/session.selectors';
import Layout from '../Layout/Layout';
import ISessionForScrumMasterProps from './interface/ISessionForScrumMasterProps';
import ScrumMasterPanel from './ScrumMasterPanel/ScrumMasterPanel';

export class SessionForScrumMaster extends React.Component<ISessionForScrumMasterProps, any> {
    componentDidMount() {
        const {
            match: {
                params: { id },
            },
        } = this.props;
        if (id) {
            this.props.setSelectedSession(id);
        }
        setInterval(this.reRenderComponent, 1000);
    }

    render() {
        const { selectedSession, activeUserStory } = this.props;
        console.log('rendered');
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
                                type={UserTypeEnum.SCRUM_MASTER}
                            />
                        </div>
                        <div className="col-4">
                            <ScrumMasterPanel />
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }
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
        getSessionsFromLocalStorage: () => {
            dispatch(getSessionsFromLocalStorage());
        },
    };
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(SessionForScrumMaster),
);
