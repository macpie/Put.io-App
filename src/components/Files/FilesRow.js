import React, {PropTypes} from 'react';
import {TableRow, TableRowColumn} from 'material-ui/Table';
import Checkbox from 'material-ui/Checkbox';
import FolderIcon from 'material-ui/svg-icons/file/folder';
import FileIcon from 'material-ui/svg-icons/editor/insert-drive-file';
import VideoIcon from 'material-ui/svg-icons/av/movie';
import * as _ from 'lodash';
import * as utility from '../../utils';
import DownloadLink from './DownloadLink';

const fileType = (file) => {
    if (file.file_type === 'FOLDER') {
        return (<FolderIcon />);
    } else if (file.file_type === 'VIDEO') {
        return (<VideoIcon />);
    } else {
        return (<FileIcon />);
    }
}

export default class FilesRow extends React.Component {
    state = {
        checked: false
    }
    componentWillReceiveProps(nextProps) {
        const {checked} = nextProps;

        this.setState({checked});
    }
    handleSelect = (e, checked) => {
        const {file, onSelect} = this.props;

        if(_.isFunction(onSelect)) {
            onSelect(file.id, checked);
        }

        this.setState({checked});
    }
    render() {
        const {
            file,
            ...props
        } = this.props;

        return (
            <TableRow {...props} selectable={false}>
                {props.children[0]}
                <TableRowColumn style={{
                    width: 24
                }}>
                    <Checkbox
                        checked={this.state.checked}
                        onClick={(e) => {e.stopPropagation()}}
                        onCheck={this.handleSelect}
                    />
                </TableRowColumn>
                <TableRowColumn style={{
                    width: 24,
                    cursor: 'pointer'
                }}>
                    {fileType(file)}
                </TableRowColumn>
                <TableRowColumn style={{
                    cursor: 'pointer'
                }}>
                    {file.name}
                </TableRowColumn>
                <TableRowColumn style={{
                    width: 24,
                    cursor: 'pointer'
                }}>
                    <DownloadLink file={file} />
                </TableRowColumn>
                <TableRowColumn style={{
                    width: 75
                }}>
                    {utility.bytesToString(file.size)}
                </TableRowColumn>
            </TableRow>
        );
    }
};

FilesRow.propTypes = {
    file: PropTypes.object.isRequired,
    selected: PropTypes.bool,
    onSelect: PropTypes.func
};
