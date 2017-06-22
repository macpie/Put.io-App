import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

export default class RenameFile extends React.Component {
    state = {
        open: false,
        value: ''
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            open: nextProps.open,
            value: nextProps.name
        });
    }
    handleOpen = () => {
        this.setState({open: true});
    }
    handleClose = () => {
        this.setState({
            value: '',
            open: false
        });
        this.props.onCancel();
    }
    handleCreate = () => {
        this.props.onRename(this.state.value);
        this.handleClose();
    }
    handleChange = (e, value) => {
        this.setState({value});
    }
    render() {
        const {name} = this.props;

        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label="Rename"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleCreate}
            />,
        ];

        let title = 'Rename';

        if(name) title += ' ' + name;

        return (
            <Dialog
              title={title}
              actions={actions}
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleClose}
            >
                <TextField
                    hintText="Name"
                    floatingLabelText="File Name"
                    fullWidth={true}
                    onChange={this.handleChange}
                    value={this.state.value}
                />
            </Dialog>
        );
    }
};

RenameFile.propTypes = {
    name: PropTypes.string,
    onRename: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
};
