import React from 'react';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import { withRouter } from 'react-router';
import Layout from '../Layout/Layout';
import ISessionErrorProps from './interface/ISessionErrorProps';

export class SessionError extends React.Component<ISessionErrorProps, any> {
    componentDidMount() {
        const {
            match: {
                params: { type },
            },
        } = this.props;
        const errorTitle = type === 'full' ? 'SESSION IS FULL' : 'SESSION IS NOT FOUND';
        toastr.error(errorTitle, '');
    }
    render() {
        return (
            <Layout>
                <div />
            </Layout>
        );
    }
}

export default withRouter(connect()(SessionError));
