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

const mapStateToProps = (state) => {
    return {
        user: state.user,
        menu: state.menu
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        menuActions: bindActionCreators(MenuActions, dispatch),
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
