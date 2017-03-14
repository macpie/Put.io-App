import React from 'react';
import Snackbar from 'material-ui/Snackbar';

export default class Notification extends React.Component {
    state = {
        open: false
    }
    componentWillReceiveProps(nextProps) {
        const {open} = nextProps

        this.setState({open});
    }
    handleRequestClose = () => {
        this.setState({
             open: false
        });
    }
    render() {
        return (
            const {message, action} = this.props;

            <Snackbar
                open={this.state.open}
                message={message}
                action={action}
                autoHideDuration={4000}
                onRequestClose={this.handleRequestClose}
            />
        );
    }
};
