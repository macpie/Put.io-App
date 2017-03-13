import React, {PropTypes} from 'react';
import {Table, TableBody, TableRow, TableHeader, TableHeaderColumn} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import CreateFolderIcon from 'material-ui/svg-icons/file/create-new-folder';
import FilesRow from './FilesRow';

export default class FilesTable extends React.Component {
    state = {
        openMenu: false
    }
    handleMenuToggle = () => {
        this.setState({
            openMenu: (this.state.openMenu) ? false : true
        });
    }
    render() {
        const {parent, files, rowClick, menuSelect} = this.props;

        let rows = [];

        files.forEach((file) => {
            rows.push(<FilesRow key={file.id} file={file} onClick={(e) => {
                rowClick(file, e)
            }}/>);
        });

        const btn = (<RaisedButton onTouchTap={this.handleMenuToggle} label="Actions"/>);

        return (
            <Table multiSelectable={false} selectable={false}>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                    <TableRow>
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
                                open={this.state.openMenu}
                                onRequestChange={this.handleMenuToggle}
                                onChange={menuSelect}
                                iconButtonElement={btn}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left'
                                }}
                                targetOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left'
                                }}
                            >
                                <MenuItem value="new_folder" primaryText="New Folder" leftIcon={<CreateFolderIcon />} />
                            </IconMenu>
                        </TableHeaderColumn>
                        <TableHeaderColumn style={{
                            width: 75
                        }}>
                            Size
                        </TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody key={parent.id} showRowHover={true} displayRowCheckbox={false}>
                    {rows}
                </TableBody>
            </Table>
        );

    }
};

FilesTable.propTypes = {
    parent: PropTypes.object,
    files: PropTypes.array,
    rowClick: PropTypes.func,
    menuSelect: PropTypes.func
};
