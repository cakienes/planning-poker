import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { getSessionsFromLocalStorage } from '../../redux/session/session.actions';
import CreateSession from '../CreateSession/CreateSession';
import SessionError from '../SessionError/SessionError';
import SessionForDeveloper from '../SessionForDeveloper/SessionForDeveloper';
import SessionForScrumMaster from '../SessionForScrumMaster/SessionForScrumMaster';
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
                <Route path="/session/:id/developer/:developerId?" exact component={SessionForDeveloper} />
                <Route path="/:optionalUrl/developer/:developerId?" exact component={SessionForDeveloper} />
                <Route path="/session/:id/scrum-master" exact component={SessionForScrumMaster} />
                <Route path="/session-error" exact component={SessionError} />
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
