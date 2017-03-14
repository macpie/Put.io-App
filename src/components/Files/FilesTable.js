import React, {PropTypes} from 'react';
import {Table, TableBody, TableRow, TableRowColumn, TableHeader, TableHeaderColumn} from 'material-ui/Table';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import CreateFolderIcon from 'material-ui/svg-icons/file/create-new-folder';
import FilesRow from './FilesRow';
import * as _ from 'lodash';

export default class FilesTable extends React.Component {
    state = {
        openMenu: false,
        selected: []
    }
    handleMenuToggle = () => {
        this.setState({
            openMenu: (this.state.openMenu) ? false : true
        });
    }
    handleSelectAll = (e, checked) => {
        const {files} = this.props;

        if(checked) {
            this.setState({
                selected: _.map(files, 'id')
            });
        } else {
            this.setState({
                selected: []
            });
        }
    }
    handleSelect = (id, checked) => {
        const {selected} = this.state;

        if(checked) {
            this.setState({
                selected: _.concat(selected, [id])
            });
        } else {
            this.setState({
                selected: _.without(selected, id)
            });
        }
    }
    render() {
        const {parent, files, rowClick, menuSelect} = this.props;
        const {selected, openMenu} = this.state;

        const content = () => {
            if(_.isEmpty(files)) {
                return (
                    <TableRow>
                        <TableRowColumn style={{textAlign: 'center'}}>Nothing</TableRowColumn>
                    </TableRow>
                );
            } else {
                let rows = [];

                files.forEach((file) => {
                    const checked = (_.indexOf(selected, file.id) === -1) ? false : true;

                    rows.push(<FilesRow key={file.id} file={file} onClick={(e) => {
                        rowClick(file, e)
                    }} checked={checked} onSelect={this.handleSelect} />);
                });

                return rows;
            }
        };

        const btn = (<RaisedButton onTouchTap={this.handleMenuToggle} label="Actions" />);

        return (
            <Table multiSelectable={false} selectable={false}>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                    <TableRow>
                        <TableHeaderColumn style={{
                            width: 24
                        }}>
                            <Checkbox onCheck={this.handleSelectAll} />
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
                    {content()}
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
