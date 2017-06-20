import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

export default class CreateFolder extends React.Component {
    state = {
        open: false,
        value: ''
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            open: nextProps.open
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
        this.props.cancel();
    }
    handleCreate = () => {
        this.props.create(this.state.value);
        this.handleClose();
    }
    handleChange = (e, value) => {
        this.setState({value});
    }
    render() {
        const {parent} = this.props;

        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label="Create Folder"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleCreate}
            />,
        ];

        let title = 'Create folder';

        if(parent && parent.name) title += ' in ' + parent.name;

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
                    floatingLabelText="Folder Name"
                    fullWidth={true}
                    onChange={this.handleChange}
                    value={this.state.value}
                />
            </Dialog>
        );
    }
};

CreateFolder.propTypes = {
    parent: PropTypes.object,
    create: PropTypes.func.isRequired
};
