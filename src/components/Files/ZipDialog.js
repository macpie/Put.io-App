import React, {PropTypes} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import * as utility from '../../utils';

export default class ZipDialog extends React.Component {
    state = {
        open: false
    }
    componentWillMount() {
        const {open} = this.props;

        this.setState({open});
    }
    componentWillReceiveProps(nextProps) {
        const {open} = nextProps

        this.setState({open});
    }
    handleClose = () => {
        this.setState({
             open: false
        });
    }
    render() {
        const {zip} = this.props;

        const actions = [
            <FlatButton
                label="Cancel"
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                href={zip.url}
                onTouchTap={this.handleClose}
                label="Download"
                primary={true}
            />
       ];

        return (
            <Dialog
                title={"Zip Created " + utility.bytesToString(zip.size)}
                actions={actions}
                modal={false}
                open={this.state.open}
           />
        );
    }
};

ZipDialog.propTypes = {
    open: PropTypes.bool,
    zip: PropTypes.object
};
