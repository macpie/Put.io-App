import React from 'react';
import {Col} from 'react-flexbox-grid/lib';
import Paper from 'material-ui/Paper';
import * as _ from 'lodash';
import Breadcrumbs from './Breadcrumbs';
import RenameFile from '../RenameFile';
import FileText from './FileText';
import FileVideo from './FileVideo';

export default class File extends React.Component {
    state = {
        renameFile: {}
    }
    handleReset = () => {
        this.setState({
            renameFile: {}
        });
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
        const {breadcrumbs, parent, goTo, filesActions, stream} = this.props;
        const {renameFile} = this.state;

        const content = () => {
            switch (parent.file_type) {
                case "TEXT":
                    return <FileText file={parent} filesActions={filesActions} content={stream} />;
                case "VIDEO":
                    return <FileVideo file={parent} />
                default:
                    return null;
            }
        };

        return (
            <Col id="File" xs={12}>
                <Paper zDepth={1}>
                    <Breadcrumbs breadcrumbs={breadcrumbs} parent={parent} goTo={goTo}  edit={this.handleEdit} />
                    {content()}
                </Paper>
                <RenameFile open={!_.isEmpty(renameFile)} name={renameFile.name || ''} rename={this.handleRenameFile} cancel={this.handleReset} />
            </Col>
        );
    }
};
