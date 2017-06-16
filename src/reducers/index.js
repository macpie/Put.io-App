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
import zip from './Zip';
import stream from './Stream';
import errors from './Errors';
import mp4 from './Mp4';

export default combineReducers({
    routing: routerReducer,
    menu,
    user,
    events,
    account,
    transfers,
    files,
    breadcrumbs,
    parent,
    zip,
    stream,
    errors,
    mp4
});
