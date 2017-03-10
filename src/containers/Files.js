import {
    bindActionCreators
} from 'redux';
import {
    connect
} from 'react-redux';
import {
    push
} from 'react-router-redux';
import * as FilesActions from '../actions/Files';
import Files from '../components/Files';

const mapStateToProps = (state, props) => {
    return {
        files: state.files,
        breadcrumbs: state.breadcrumbs,
        parent: state.parent,
        id: props.params
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        filesActions: bindActionCreators(FilesActions, dispatch),
        goTo: (dest) => {
            dispatch(push(dest));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Files);
