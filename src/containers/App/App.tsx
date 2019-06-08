import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { getSessionsFromLocalStorage } from '../../redux/session/session.actions';
import CreateSession from '../CreateSession/CreateSession';
import SessionDetail from '../SessionDetail/SessionDetail';
import './App.scss';
import IAppProps from './interface/IAppProps';

export class App extends React.Component<IAppProps, any> {
    constructor(props: IAppProps) {
        super(props);

        this.props.getSessionsFromLocalStorage();
    }
    render() {
        return (
            <BrowserRouter>
                <Route path="/" exact component={CreateSession} />
                <Route path="/session/:id/scrum-master" exact component={SessionDetail} />
            </BrowserRouter>
        );
    }
}

export const mapDispatchToProps = (dispatch: Function) => {
    return {
        getSessionsFromLocalStorage: () => {
            dispatch(getSessionsFromLocalStorage());
        },
    };
};

export default connect(
    null,
    mapDispatchToProps,
)(App);
