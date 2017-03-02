import {
    connect
} from 'react-redux';
import {
    routerActions
} from 'react-router-redux'
import Welcome from '../components/Welcome';

const mapStateToProps = (state, props) => {
    return {
        user: state.user,
        redirect: props.location.query.redirect || '/events'
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        replace: (dest) => {
            dispatch(routerActions.replace(dest));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Welcome);
