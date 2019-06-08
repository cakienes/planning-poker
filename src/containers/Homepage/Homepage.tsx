import React from 'react';
import { connect } from 'react-redux';
import LinkBox from '../../components/LinkBox/LinkBox';
import IGlobalState from '../../interfaces/IGlobalState';
import ISession from '../../interfaces/ISession';
import Layout from '../Layout/Layout';
import './Homepage.scss';
import IHomepageProps from './interface/IHomepageProps';
import SessionItem from './SessionItem/SessionItem';

export class Homepage extends React.Component<IHomepageProps, any> {
    render() {
        return (
            <Layout>
                <div className="row">
                    <div className="col">
                        <div className="alignCenter">
                            <LinkBox to="create-session" text="Start Session" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="sessionList">Session List</div>
                    </div>
                    <div className="col-12">{this.renderSessions()}</div>
                </div>
            </Layout>
        );
    }

    renderSessions = (): React.ReactNode => {
        const { sessions } = this.props;
        if (sessions && sessions.length > 0) {
            return sessions.map((session: ISession) => <SessionItem session={session} key={session.id} />);
        }
    };
}

const mapStateToProps = (state: IGlobalState) => ({
    sessions: state.session && state.session.sessions,
});
export default connect(mapStateToProps)(Homepage);
