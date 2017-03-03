import React, {PropTypes} from 'react';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import EventIcon from 'material-ui/svg-icons/action/event';
import TransferIcon from 'material-ui/svg-icons/action/swap-horiz';

export default class Menu extends React.Component {
    render() {
        return (
            <Drawer
                docked={false}
                width={200}
                open={this.props.open}
                onRequestChange={this.props.menuToggle}
            >
                <AppBar title="Menu" />
                <MenuItem
                    leftIcon={<EventIcon />}
                    onClick={() => {
                        this.props.push('/events');
                        this.props.menuToggle();
                    }}
                >
                    Events
                </MenuItem>
                <MenuItem
                    leftIcon={<TransferIcon />}
                    onClick={() => {
                        this.props.push('/transfers');
                        this.props.menuToggle();
                    }}
                >
                    Transfers
                </MenuItem>
            </Drawer>
        );
    }
};

Menu.propTypes = {
    open: PropTypes.bool.isRequired,
    menuToggle: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired
};
