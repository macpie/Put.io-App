import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import DownloadIcon from 'material-ui/svg-icons/file/cloud-download';
import * as PutioAPIs from '../../apis/Putio';

export default class downloadLink extends React.Component {
    render() {
        const {file} = this.props;

        if (file.file_type === "FOLDER") {
            return null;
        } else {
            return (
                <IconButton
                    href={PutioAPIs.downloadLink(file.id)}
                    onClick={(e) => {
                        e.stopPropagation()
                    }}
                    target="_blank"
                >
                    <DownloadIcon />
                </IconButton>
            );
        }

    }
}

downloadLink.propTypes = {
    file: PropTypes.object.isRequired
};
