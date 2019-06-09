import 'bootstrap/dist/css/bootstrap.css';
import 'open-iconic/font/css/open-iconic-bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import App from './containers/App/App';
import configureStore from './containers/store';
import './index.css';

ReactDOM.render(
    <Provider store={configureStore()}>
        <App />
        <ReduxToastr
            timeOut={3000}
            newestOnTop={false}
            preventDuplicates
            position="top-center"
            transitionIn="fadeIn"
            transitionOut="fadeOut"
        />
    </Provider>,
    document.getElementById('root'),
);
