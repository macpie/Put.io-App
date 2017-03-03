import {
    bindActionCreators
} from 'redux';
import {
    connect
} from 'react-redux';
import * as TransfersActions from '../actions/Transfers';
import Transfers from '../components/Transfers';

const mapStateToProps = (state) => {
    return {
        transfers: state.transfers
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        transfersActions: bindActionCreators(TransfersActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Transfers);
