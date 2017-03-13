import React from 'react';
import {Col} from 'react-flexbox-grid/lib';
import Paper from 'material-ui/Paper';
import Breadcrumbs from './Breadcrumbs';
import FilesTable from './FilesTable';
import CreateFolder from '../CreateFolder';

export default class Files extends React.Component {
    state = {
        createFolder: false
    }
    constructor(props) {
        super(props);

        const {filesActions, params} = props;

        filesActions.get(params.file_id);
    }
    componentWillReceiveProps(nextProps) {
        const {filesActions, params} = nextProps;

        if (this.props.params.file_id !== params.file_id) {
            filesActions.get(params.file_id);
        }
    }
    handleRowClick = (file) => {
        const {goTo} = this.props;

        goTo("/files/" + file.id);
    }
    handleMenuSelect = (e, value) => {
        switch(value) {
            case 'new_folder':
                this.setState({createFolder: true});
                break;
            default:
                console.log(value);
        }
    }
    handleCreateFolder = (name) => {
        const {filesActions, parent} = this.props;

        filesActions.createFolder(parent.id, name);
        this.setState({createFolder: false});
    }
    render() {
        const {files, breadcrumbs, parent, goTo} = this.props;

        return (
            <Col id="Files" xs={12}>
                <Paper zDepth={1}>
                    <Breadcrumbs breadcrumbs={breadcrumbs} parent={parent} goTo={goTo}/>
                    <FilesTable
                        files={files}
                        parent={parent}
                        rowClick={this.handleRowClick}
                        menuSelect={this.handleMenuSelect}
                        createFolder={this.handleFolderCreate}
                    />
                </Paper>
                <CreateFolder open={this.state.createFolder} parent={parent} create={this.handleCreateFolder}/>
            </Col>
        );
    }
};
