import {
    bindActionCreators
} from 'redux';
import {
    connect
} from 'react-redux';
import {
    push
} from 'react-router-redux';
import * as TransfersActions from '../actions/Transfers';
import Transfers from '../components/Transfers';

const mapStateToProps = (state) => {
    return {
        transfers: state.transfers
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        transfersActions: bindActionCreators(TransfersActions, dispatch),
        goTo: (dest) => {
            dispatch(push(dest));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Transfers);
