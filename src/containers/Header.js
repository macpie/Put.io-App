import {
    bindActionCreators
} from 'redux';
import {
    connect
} from 'react-redux';
import * as AccountActions from '../actions/Account';
import Header from '../components/Header';

const mapStateToProps = (state) => {
    return {
        account: state.account
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        accountActions: bindActionCreators(AccountActions, dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);
