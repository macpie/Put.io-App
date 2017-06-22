import React from 'react';
import PropTypes from 'prop-types';
import {TableRow, TableHeaderColumn} from 'material-ui/Table';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import CreateFolderIcon from 'material-ui/svg-icons/file/create-new-folder';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import ArchiveIcon from 'material-ui/svg-icons/content/archive';
import SettingsIcon from 'material-ui/svg-icons/action/settings-applications';
import * as _ from 'lodash';

export default class FilesTableHeader extends React.Component {
    state = {
        openMenu: false
    }
    handleMenuToggle = () => {
        this.setState({
            openMenu: (this.state.openMenu) ? false : true
        });
    }
    render() {
        const {onMenuSelect, onSelectAll} = this.props;
        const {openMenu} = this.state;

        const btn = (<RaisedButton onTouchTap={this.handleMenuToggle} label="Actions" icon={<SettingsIcon />} />);

        return (
            <TableRow>
                <TableHeaderColumn style={{
                    width: 24
                }}>
                    <Checkbox onCheck={onSelectAll} />
                </TableHeaderColumn>
                <TableHeaderColumn style={{
                    width: 24
                }}>
                    Type
                </TableHeaderColumn>
                <TableHeaderColumn>
                    Name
                </TableHeaderColumn>
                <TableHeaderColumn style={{
                    width: 100
                }}>
                    <IconMenu
                        open={openMenu}
                        onRequestChange={this.handleMenuToggle}
                        onChange={onMenuSelect}
                        iconButtonElement={btn}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'middle'
                        }}
                    >
                        <MenuItem value="new_folder" primaryText="New Folder" leftIcon={<CreateFolderIcon />} />
                        <MenuItem value="delete" primaryText="Delete" leftIcon={<DeleteIcon />} />
                        <MenuItem value="zip" primaryText="Zip & Download" leftIcon={<ArchiveIcon />} />
                    </IconMenu>
                </TableHeaderColumn>
                <TableHeaderColumn style={{
                    width: 75
                }}>
                    Size
                </TableHeaderColumn>
            </TableRow>
        );

    }
};

FilesTableHeader.propTypes = {
    onSelectAll: PropTypes.func,
    onMenuSelect: PropTypes.func
};
