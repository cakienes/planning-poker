import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import IGlobalState from '../interfaces/IGlobalState';
import combineReducers from './combineReducers';
import configureStore from './store';

jest.mock('redux', () => {
    return {
        createStore: jest.fn(),
        applyMiddleware: jest.fn(),
    };
});
jest.mock('./combineReducers', () => {
    return {};
});
jest.mock('redux-devtools-extension', () => {
    return { composeWithDevTools: jest.fn() };
});

describe('store.ts', () => {
    it('configureStore while initial state is undefined', () => {
        configureStore(undefined);

        expect(createStore).toHaveBeenCalledWith(
            combineReducers,
            { session: {} },
            composeWithDevTools(applyMiddleware(thunk)),
        );
    });
    it('configureStore', () => {
        const dumInitialStore: IGlobalState = {
            session: {},
        };
        configureStore(dumInitialStore);

        expect(createStore).toHaveBeenCalledWith(
            combineReducers,
            dumInitialStore,
            composeWithDevTools(applyMiddleware(thunk)),
        );
    });
});
