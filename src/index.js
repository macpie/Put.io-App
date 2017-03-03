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
import Welcome from './containers/Welcome';
import Events from './containers/Events';
import Transfers from './containers/Transfers';

injectTapEventPlugin();

const history = syncHistoryWithStore(browserHistory, Store);

Store.dispatch(AuthActions.authenticate());

const router = (
    <Provider store={Store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRedirect to="welcome"/>
                <Route path="welcome" component={Welcome}/>
                <Route path="events" component={UserIsAuthenticated(Events)} />
                <Route path="transfers" component={UserIsAuthenticated(Transfers)} />
                <Redirect from="*" to="/welcome"/>
            </Route>
        </Router>
    </Provider>
);

render(router, document.getElementById('root'));
