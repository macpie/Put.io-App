import React, {PropTypes} from 'react';
import IconButton from 'material-ui/IconButton';
import DownloadIcon from 'material-ui/svg-icons/file/cloud-download';
import * as PutioAPIs from '../../apis/Putio';

export default class downloadLink extends React.Component {
    render() {
        const {file} = this.props;

        if (file.file_type === 'FOLDER') {
            return null;
        } else {
            return (
                <IconButton onClick={(e) => {
                    e.stopPropagation()
                }}>
                    <a href={PutioAPIs.downloadLink(file.id)} target="_self">
                        <DownloadIcon/>
                    </a>
                </IconButton>
            );
        }

    }
}

downloadLink.propTypes = {
    file: PropTypes.object.isRequired
};
