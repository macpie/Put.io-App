import React from 'react';
import PropTypes from 'prop-types';
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
        const {onClosing} = this.props;

        this.setState({
             open: false
        });

        onClosing();
    }
    render() {
        const {zip} = this.props;

        const actions = [
            <FlatButton
                label="Cancel"
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                href={(typeof zip.url === "string") ? zip.url : ""}
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
    open: PropTypes.bool.isRequired,
    zip: PropTypes.object.isRequired,
    onClosing: PropTypes.func.isRequired
};
