import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setSelectedSession } from '../../redux/session/session.actions';
import Layout from '../Layout/Layout';
import ActiveStory from './ActiveStory/ActiveStory';
import ISessionDetailProps from './interface/ISessionDetailProps';
import ScrumMasterPanel from './ScrumMasterPanel/ScrumMasterPanel';
import './SessionDetail.scss';
import UserStoryList from './UserStoryList/UserStoryList';

export class SessionDetail extends React.Component<ISessionDetailProps, any> {
    componentDidMount() {
        const { match } = this.props;
        if (match && match.params && match.params.id) {
            this.props.setSelectedSession(match.params.id);
        }
    }
    render() {
        return (
            <Layout>
                <div className="session">
                    <div className="row">
                        <div className="col">
                            <UserStoryList />
                        </div>
                        <div className="col-4">
                            <ActiveStory />
                        </div>
                        <div className="col-4">
                            <ScrumMasterPanel />
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }
}

export const mapDispatchToProps = (dispatch: Function) => {
    return {
        setSelectedSession: (id: string) => {
            dispatch(setSelectedSession(id));
        },
    };
};

export default withRouter(
    connect(
        null,
        mapDispatchToProps,
    )(SessionDetail),
);
