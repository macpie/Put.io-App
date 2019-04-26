import React from 'react';
import {Provider} from 'react-redux';
import {render} from 'react-dom';
import {Router, Route, IndexRedirect, Redirect, browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Store from './stores';
import * as AuthActions from './actions/Auth';
import {UserIsAuthenticated} from './utils/RouteWrappers';
import App from './containers/App';
import Settings from './containers/Settings';
import Events from './containers/Events';
import Transfers from './containers/Transfers';
import Files from './containers/Files';
import './index.css';

injectTapEventPlugin();

const history = syncHistoryWithStore(browserHistory, Store);

Store.dispatch(AuthActions.authenticate());

const router = (
    <Provider store={Store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRedirect to="settings"/>
                <Route path="settings" component={Settings}/>
                <Route path="events" component={UserIsAuthenticated(Events)} />
                <Route path="transfers" component={UserIsAuthenticated(Transfers)} />
                <Route path="files" component={UserIsAuthenticated(Files)} />
                <Route path="files/:file_id" component={UserIsAuthenticated(Files)} />
                <Redirect from="*" to="/settings"/>
            </Route>
        </Router>
    </Provider>
);

render(router, document.getElementById("root"));
