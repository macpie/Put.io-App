import React from 'react';
import {Col} from 'react-flexbox-grid/lib';
import Paper from 'material-ui/Paper';
import Breadcrumbs from './Breadcrumbs';
import FilesTable from './FilesTable';

export default class Files extends React.Component {
    constructor(props) {
        super(props);

        this.handleCellClick = this
            .handleCellClick
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
    handleCellClick(r, c, e) {
        e.preventDefault();

        const {files, goTo} = this.props;

        if (c === 0 || c === 1) {
            goTo("/files/" + files[r].id);
        }
    }
    render() {
        const {files, breadcrumbs, parent, goTo} = this.props;

        return (
            <Col id="Files" xs={12}>
                <Paper zDepth={1}>
                    <Breadcrumbs breadcrumbs={breadcrumbs} parent={parent} goTo={goTo}/>
                    <FilesTable files={files} parent={parent} cellClick={this.handleCellClick}/>
                </Paper>
            </Col>
        );
    }
};
