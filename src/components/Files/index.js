import React from 'react';
import {Col} from 'react-flexbox-grid/lib';
import Paper from 'material-ui/Paper';
import * as _ from 'lodash';
import Breadcrumbs from './Breadcrumbs';
import FilesTable from './FilesTable';
import CreateFolder from '../CreateFolder';
import RenameFile from '../RenameFile';
import ZipDialog from './ZipDialog';

export default class Files extends React.Component {
    state = {
        createFolder: false,
        renameFile: {},
        selected: []
    }
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
    handleReset = () => {
        this.setState({
            createFolder: false,
            renameFile: {}
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
    handleRowClick = (file) => {
        const {goTo} = this.props;

        goTo("/files/" + file.id);
    }
    handleMenuSelect = (e, value) => {
        const {filesActions, zipActions} = this.props;
        const {selected} = this.state;

        switch(value) {
            case 'new_folder':
                this.setState({createFolder: true});
                break;
            case 'delete':
                filesActions.remove(selected);
                break;
            case 'zip':
                zipActions.create(selected);
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

        filesActions.rename(renameFile.id, name);
        this.setState({renameFile: {}});
    }
    render() {
        const {files, breadcrumbs, parent, goTo, zip} = this.props;
        const {createFolder, renameFile, selected} = this.state;

        let zipDialog = null;

        if(zip.url) {
            zipDialog = (<ZipDialog zip={zip} open={true} />);
        }

        return (
            <Col id="Files" xs={12}>
                <Paper zDepth={1}>
                    <Breadcrumbs breadcrumbs={breadcrumbs} parent={parent} goTo={goTo} edit={this.handleEdit} />
                    <FilesTable
                        files={files}
                        parent={parent}
                        selectAll={this.handleSelectAll}
                        select={this.handleSelect}
                        selected={selected}
                        rowClick={this.handleRowClick}
                        menuSelect={this.handleMenuSelect}
                        createFolder={this.handleFolderCreate}
                    />
                </Paper>
                <CreateFolder open={createFolder} parent={parent} create={this.handleCreateFolder} cancel={this.handleReset} />
                <RenameFile open={!_.isEmpty(renameFile)} name={renameFile.name || ''} rename={this.handleRenameFile} cancel={this.handleReset} />
                {zipDialog}
            </Col>
        );
    }
};
