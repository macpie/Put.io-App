import React from 'react';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import EventIcon from 'material-ui/svg-icons/action/event';
import TransferIcon from 'material-ui/svg-icons/action/swap-horiz';
import FolderIcon from 'material-ui/svg-icons/file/folder';
import SettingsIcon from 'material-ui/svg-icons/action/settings';

export default class Menu extends React.Component {
    render() {
        return (
            <Drawer
                docked={false}
                width={200}
                open={this.props.open}
                onRequestChange={this.props.toggle}
            >
                <AppBar title="Menu" showMenuIconButton={false} />
                <MenuItem
                    leftIcon={<EventIcon />}
                    onClick={() => {
                        this.props.push('/events');
                        this.props.toggle();
                    }}
                >
                    Events
                </MenuItem>
                <MenuItem
                    leftIcon={<TransferIcon />}
                    onClick={() => {
                        this.props.push('/transfers');
                        this.props.toggle();
                    }}
                >
                    Transfers
                </MenuItem>
                <MenuItem
                    leftIcon={<FolderIcon />}
                    onClick={() => {
                        this.props.push('/files');
                        this.props.toggle();
                    }}
                >
                    Files
                </MenuItem>
                <MenuItem
                    leftIcon={<SettingsIcon />}
                    onClick={() => {
                        this.props.push('/settings?stopRedirect=1');
                        this.props.toggle();
                    }}
                >
                    Settings
                </MenuItem>
            </Drawer>
        );
    }
};

Menu.propTypes = {
    open: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired
};
