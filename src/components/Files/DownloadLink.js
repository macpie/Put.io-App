import React, {PropTypes} from 'react';
import {TableRowColumn} from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import DownloadIcon from 'material-ui/svg-icons/file/cloud-download';
import * as PutioAPIs from '../../apis/Putio';

export default class downloadLink extends React.Component {
    render() {
        const {file} = this.props,
            style = {
                width: 24,
                cursor: 'pointer'
            };

        if (file.file_type === 'FOLDER') {
            return (<TableRowColumn style={style}/>);
        } else {
            return (
                <TableRowColumn style={style}>
                    <IconButton onClick={(e) => {
                        e.stopPropagation()
                    }}>
                        <a href={PutioAPIs.downloadLink(file.id)} target="_self">
                            <DownloadIcon/>
                        </a>
                    </IconButton>
                </TableRowColumn>
            );
        }

    }
}

downloadLink.propTypes = {
    file: PropTypes.object.isRequired
};
