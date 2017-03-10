import React from 'react';
import {Col} from 'react-flexbox-grid/lib';
import Paper from 'material-ui/Paper';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from 'material-ui/Table';
import Breadcrumbs from './Breadcrumbs';
import FolderIcon from 'material-ui/svg-icons/file/folder';
import FileIcon from 'material-ui/svg-icons/editor/insert-drive-file';
import VideoIcon from 'material-ui/svg-icons/av/movie';
import * as utility from '../../utils';

export default class Events extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this
            .handleClick
            .bind(this);

        const {filesActions, params} = props;

        filesActions.get(params.file_id);
    }
    componentWillReceiveProps(nextProps) {
        const {filesActions, params} = nextProps;

        if (this.props.params.file_id !== params.file_id) {
            filesActions.get(params.file_id);
        }
    }
    handleClick(r, c, e) {
        e.preventDefault();

        const {files, goTo} = this.props;

        if (c === 0 || c === 1) {
            goTo("/files/" + files[r].id);
        }
    }
    render() {
        const {files, breadcrumbs, parent, goTo} = this.props;

        const fileType = (file) => {
            if (file.file_type === 'FOLDER') {
                return (<FolderIcon/>);
            } else if (file.file_type === 'VIDEO') {
                return (<VideoIcon/>);
            } else {
                return (<FileIcon/>);
            }
        }

        let rows = [];

        files.forEach((file) => {
            rows.push(
                <TableRow key={file.id} >
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
                    <TableRowColumn style={{width: 75}}>
                        {utility.bytesToString(file.size)}
                    </TableRowColumn>
                </TableRow>
            );
        });

        return (
            <Col id="Files" xs={12}>
                <Paper zDepth={1}>
                    <Breadcrumbs breadcrumbs={breadcrumbs} parent={parent} goTo={goTo}/>

                    <Table multiSelectable={true} onCellClick={this.handleClick} >
                        <TableHeader>
                            <TableRow>
                                <TableHeaderColumn style={{
                                    width: 24
                                }}>Type</TableHeaderColumn>
                                <TableHeaderColumn>Name</TableHeaderColumn>
                                <TableHeaderColumn style={{
                                    width: 75
                                }}>Size</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody showRowHover={true}>{rows}</TableBody>
                    </Table>
                </Paper>
            </Col>
        );
    }
};
