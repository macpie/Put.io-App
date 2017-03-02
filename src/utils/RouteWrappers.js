import {
    UserAuthWrapper
} from 'redux-auth-wrapper';
import {
    routerActions
} from 'react-router-redux';

export const UserIsAuthenticated = UserAuthWrapper({
    authSelector: state => state.user,
    redirectAction: routerActions.replace,
    wrapperDisplayName: 'UserIsAuthenticated'
});

export const VisibleAuthenticated = UserAuthWrapper({
    authSelector: state => state.user,
    wrapperDisplayName: 'VisibleAuthenticated',
    FailureComponent: null
});
