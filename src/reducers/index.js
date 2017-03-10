import {
    combineReducers
} from 'redux';
import {
    routerReducer
} from 'react-router-redux';
import menu from './Menu';
import user from './User';
import events from './Events';
import account from './Account';
import transfers from './Transfers';
import files from './Files';
import breadcrumbs from './Breadcrumbs';
import parent from './Parent';

export default combineReducers({
    menu,
    user,
    events,
    account,
    transfers,
    files,
    breadcrumbs,
    parent,
    routing: routerReducer
});
