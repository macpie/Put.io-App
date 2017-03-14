import React, {PropTypes} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

export default class RenameFolder extends React.Component {
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
    }
    handleCreate = () => {
        this.props.rename(this.state.value);
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

RenameFolder.propTypes = {
    name: PropTypes.string,
    rename: PropTypes.func.isRequired
};
