import React from 'react';
import {Col} from 'react-flexbox-grid/lib';
import Paper from 'material-ui/Paper';
import Breadcrumbs from './Breadcrumbs';
import FilesTable from './FilesTable';

export default class Files extends React.Component {
    constructor(props) {
        super(props);

        this.handleRowClick = this.handleRowClick.bind(this);

        const {filesActions, params} = props;

        filesActions.get(params.file_id);
    }
    componentWillReceiveProps(nextProps) {
        const {filesActions, params} = nextProps;

        if (this.props.params.file_id !== params.file_id) {
            filesActions.get(params.file_id);
        }
    }
    handleRowClick(file, e) {
        e.preventDefault();

        const {goTo} = this.props;

        goTo("/files/" + file.id);
    }
    render() {
        const {files, breadcrumbs, parent, goTo} = this.props;

        return (
            <Col id="Files" xs={12}>
                <Paper zDepth={1}>
                    <Breadcrumbs breadcrumbs={breadcrumbs} parent={parent} goTo={goTo}/>
                    <FilesTable files={files} parent={parent} rowClick={this.handleRowClick}/>
                </Paper>
            </Col>
        );
    }
};
