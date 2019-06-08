import React from 'react';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import { withRouter } from 'react-router';
import uuid from 'uuid';
import { UserStoryStatusEnum } from '../../helper/Enum';
import ISession from '../../interfaces/ISession';
import IUserStory from '../../interfaces/IUserStory';
import { createSession } from '../../redux/session/session.actions';
import Layout from '../Layout/Layout';
import CreateSessionForm from './CreateSessionForm/CreateSessionForm';
import ICreateSessionProps from './interface/ICreateSessionProps';
export class CreateSession extends React.Component<ICreateSessionProps, any> {
    render() {
        return (
            <Layout>
                <CreateSessionForm onSubmit={this.onSubmit} />
            </Layout>
        );
    }

    onSubmit = (values: any): void => {
        if (values) {
            const userStories: IUserStory[] = [];
            // eslint-disable-next-line
            values.userStories.split('\n').map((storyName: string, index: number) => {
                if (storyName && storyName !== '') {
                    userStories.push({
                        storyName,
                        status: index === 0 ? UserStoryStatusEnum.ACTIVE : UserStoryStatusEnum.NOT_VOTED,
                    });
                }
            });

            const newSession: ISession = {
                id: uuid(),
                numberOfVoters: values.numberOfVoters,
                sessionName: values.sessionName,
                userStories,
            };

            this.props.createSession(newSession);
            this.props.history.push(`/session/${newSession.id}/scrum-master`);
        } else {
            toastr.error('Validation Error', 'Please fill the form');
        }
    };
}

export const mapDispatchToProps = (dispatch: Function) => {
    return {
        createSession: (values: ISession) => {
            dispatch(createSession(values));
        },
    };
};

export default withRouter(
    connect(
        null,
        mapDispatchToProps,
    )(CreateSession),
);
