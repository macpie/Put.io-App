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
        renameFile: {},
        interval: null
    }
    componentWillReceiveProps(nextProps) {
        const {mp4, filesActions} = nextProps;
        const {interval} = this.state;

        if(mp4.status === "COMPLETED") {
            clearInterval(interval);
            filesActions.mp4StatusReset();
        }
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
    handleConvert = (id) => {
        const {filesActions} = this.props;
        filesActions.mp4(id);

        var interval = setInterval(() => {
            filesActions.mp4Status(id);
        }, 3000);

        this.setState({
            interval: interval
        });
    }
    render() {
        const {breadcrumbs, parent, goTo, filesActions, stream, mp4} = this.props;
        const {renameFile} = this.state;

        const content = () => {
            switch (parent.file_type) {
                case "TEXT":
                    return <FileText file={parent} filesActions={filesActions} content={stream} />;
                case "VIDEO":
                    return <FileVideo file={parent} convert={this.handleConvert} mp4={mp4} />
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
