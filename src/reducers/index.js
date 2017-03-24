import {
    combineReducers
} from 'redux';
import {
    routerReducer
} from 'react-router-redux';
import {
    loadingBarReducer
} from 'react-redux-loading-bar';
import menu from './Menu';
import user from './User';
import events from './Events';
import account from './Account';
import transfers from './Transfers';
import files from './Files';
import breadcrumbs from './Breadcrumbs';
import parent from './Parent';
import zip from './Zip';

export default combineReducers({
    routing: routerReducer,
    loadingBar: loadingBarReducer,
    menu,
    user,
    events,
    account,
    transfers,
    files,
    breadcrumbs,
    parent,
    zip
});
