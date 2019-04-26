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
                onRequestChange={this.props.onToggle}
            >
                <AppBar title="Menu" showMenuIconButton={false} />
                <MenuItem
                    leftIcon={<EventIcon />}
                    onClick={() => {
                        this.props.onPush("/events");
                        this.props.onToggle();
                    }}
                >
                    Events
                </MenuItem>
                <MenuItem
                    leftIcon={<TransferIcon />}
                    onClick={() => {
                        this.props.onPush("/transfers");
                        this.props.onToggle();
                    }}
                >
                    Transfers
                </MenuItem>
                <MenuItem
                    leftIcon={<FolderIcon />}
                    onClick={() => {
                        this.props.onPush("/files");
                        this.props.onToggle();
                    }}
                >
                    Files
                </MenuItem>
                <MenuItem
                    leftIcon={<SettingsIcon />}
                    onClick={() => {
                        this.props.onPush("/settings?stopRedirect=1");
                        this.props.onToggle();
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
    onToggle: PropTypes.func.isRequired,
    onPush: PropTypes.func.isRequired
};
