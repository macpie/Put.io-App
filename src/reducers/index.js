import {
    combineReducers
} from 'redux';
import {
    routerReducer
} from 'react-router-redux';
import user from './User';
import events from './Events';
import account from './Account';

export default combineReducers({
    user,
    events,
    account,
    routing: routerReducer
});
