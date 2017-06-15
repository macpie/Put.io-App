import {
    bindActionCreators
} from 'redux';
import {
    connect
} from 'react-redux';
import {
    routerActions
} from 'react-router-redux'
import * as AuthActions from '../actions/Auth';
import Settings from '../components/Settings';

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        authActions: bindActionCreators(AuthActions, dispatch),
        replace: (dest) => {
            dispatch(routerActions.replace(dest));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Settings);
