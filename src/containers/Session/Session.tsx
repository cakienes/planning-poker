import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import LinkBox from '../../components/LinkBox/LinkBox';
import IGlobalState from '../../interfaces/IGlobalState';
import { setSelectedSession } from '../../redux/session/session.actions';
import { getSelectedSession } from '../../redux/session/session.selectors';
import Layout from '../Layout/Layout';
import ISessionProps from './interface/ISessionProps';
import './Session.scss';

export class Session extends React.Component<ISessionProps, any> {
    componentDidMount() {
        const { match } = this.props;
        if (match && match.params && match.params.id) {
            this.props.setSelectedSession(match.params.id);
        }
    }
    render() {
        const { selectedSession } = this.props;
        return (
            <Layout>
                <div className="session">
                    <div className="row">
                        <div className="col">
                            <div className="sessionName">{selectedSession && selectedSession.sessionName}</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">{this.renderVoters()}</div>
                    </div>
                </div>
            </Layout>
        );
    }

    renderVoters = (): React.ReactNode => {
        const { selectedSession } = this.props;
        if (selectedSession) {
            const array: number[] = [];
            for (let index = 0; index < Number(selectedSession.numberOfVoters); index++) {
                array.push(index);
            }
            return (
                <div>
                    <LinkBox
                        to={`/session/${selectedSession.id}/voter/scrum-master`}
                        text="View Planing As Scrum Master"
                    />
                    {array.map((i: number) => {
                        return (
                            <LinkBox
                                to={`/session/${selectedSession.id}/voter/voter-${i}`}
                                text={`View Planing As Voter ${i + 1}`}
                                key={i}
                            />
                        );
                    })}
                </div>
            );
        }
    };
}

const mapStateToProps = (state: IGlobalState) => ({
    selectedSession: getSelectedSession(state),
});

export const mapDispatchToProps = (dispatch: Function) => {
    return {
        setSelectedSession: (id: string) => {
            dispatch(setSelectedSession(id));
        },
    };
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(Session),
);
