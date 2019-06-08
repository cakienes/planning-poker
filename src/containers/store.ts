import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import IGlobalState from '../interfaces/IGlobalState';
import combineReducers from './combineReducers';

export default function configureStore(initialState: IGlobalState = { session: {} }) {
    return createStore(combineReducers, initialState as any, composeWithDevTools(applyMiddleware(thunk)));
}
