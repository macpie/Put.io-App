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
import * as ZipActions from '../actions/Zip';
import Files from '../components/Files';

const mapStateToProps = (state, props) => {
    return {
        id: props.params,
        files: state.files,
        breadcrumbs: state.breadcrumbs,
        parent: state.parent,
        zip: state.zip
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        filesActions: bindActionCreators(FilesActions, dispatch),
        zipActions: bindActionCreators(ZipActions, dispatch),
        goTo: (dest) => {
            dispatch(push(dest));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Files);
