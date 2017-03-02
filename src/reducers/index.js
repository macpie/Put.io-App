import {
    combineReducers
} from 'redux';
import {
    routerReducer
} from 'react-router-redux';
import user from './User';
import events from './Events';

export default combineReducers({
    user,
    events,
    routing: routerReducer
});
