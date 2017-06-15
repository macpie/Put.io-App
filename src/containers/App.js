import {
    bindActionCreators
} from 'redux';
import {
    connect
} from 'react-redux';
import {
    push
} from 'react-router-redux';
import App from '../components/App';
import * as MenuActions from '../actions/Menu';
import * as ErrrosActions from '../actions/Errors';

const mapStateToProps = (state) => {
    return {
        user: state.user,
        menu: state.menu,
        errors: state.errors
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        menuActions: bindActionCreators(MenuActions, dispatch),
        errorsActions: bindActionCreators(ErrrosActions, dispatch),
        routeActions: {
            push: (dest) => {
                dispatch(push(dest));
            }
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
