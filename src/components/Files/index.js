import React from 'react';
import * as _ from 'lodash';
import Files from './Files';
import File from './File';

export default class FilesIndex extends React.Component {
    constructor(props) {
        super(props);

        const {filesActions, params} = props;

        filesActions.get(params.file_id);
    }
    componentWillReceiveProps(nextProps) {
        const {filesActions, zipActions, params, zip} = nextProps;

        if(zip.id && !zip.url) {
            setTimeout(() => {
                zipActions.get(zip.id);
            }, 2000);
        }
        if (this.props.params.file_id !== params.file_id) {
            filesActions.get(params.file_id);
        }
    }
    render() {
        const {files, parent} = this.props;

        if (_.isEmpty(files) && _.isEmpty(parent)) {
            return null;
        } else if(_.isEmpty(files) && parent.file_type !== "FOLDER") {
            return (<File {...this.props} />);
        } else {
            return (<Files {...this.props} />);
        }

    }
};
