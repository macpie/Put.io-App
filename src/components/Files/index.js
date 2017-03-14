import React from 'react';
import {Col} from 'react-flexbox-grid/lib';
import Paper from 'material-ui/Paper';
import * as _ from 'lodash';
import Breadcrumbs from './Breadcrumbs';
import FilesTable from './FilesTable';
import CreateFolder from '../CreateFolder';
import RenameFile from '../RenameFile';

export default class Files extends React.Component {
    state = {
        createFolder: false,
        renameFile: {}
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
    handleEdit = (id, name) => {
        this.setState({renameFile: {id, name}});
    }
    handleRenameFile = (name) => {
        const {filesActions} = this.props;
        const {renameFile} = this.state;

        filesActions.fileRename(renameFile.id, name);
        this.setState({renameFile: {}});
    }
    render() {
        const {files, breadcrumbs, parent, goTo} = this.props;
        const {createFolder, renameFile} = this.state;

        return (
            <Col id="Files" xs={12}>
                <Paper zDepth={1}>
                    <Breadcrumbs breadcrumbs={breadcrumbs} parent={parent} goTo={goTo} edit={this.handleEdit} />
                    <FilesTable
                        files={files}
                        parent={parent}
                        rowClick={this.handleRowClick}
                        menuSelect={this.handleMenuSelect}
                        createFolder={this.handleFolderCreate}
                    />
                </Paper>
                <CreateFolder open={createFolder} parent={parent} create={this.handleCreateFolder} />
                <RenameFile open={!_.isEmpty(renameFile)} name={renameFile.name || ''} rename={this.handleRenameFile} />
            </Col>
        );
    }
};