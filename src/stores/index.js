import {
    createStore,
    applyMiddleware
} from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import {
    browserHistory
} from 'react-router';
import {
    routerMiddleware
} from 'react-router-redux';
import {
    loadingBarMiddleware
} from 'react-redux-loading-bar'
import Reducers from '../reducers';

const initialState = {},
    promise = promiseMiddleware({
        promiseTypeSuffixes: ['PENDING', 'RESOLVED', 'REJECTED']
    }),
    router = routerMiddleware(browserHistory),
    loading = loadingBarMiddleware({
        promiseTypeSuffixes: ['PENDING', 'RESOLVED', 'REJECTED']
    }),
    middlewares = [thunk, promise, router, loading];

if (process.env.NODE_ENV === 'development') {
    const createLogger = require('redux-logger');

    middlewares.push(createLogger({
        duration: true,
        collapsed: true
    }));
}

export default createStore(Reducers, initialState, applyMiddleware(...middlewares));
