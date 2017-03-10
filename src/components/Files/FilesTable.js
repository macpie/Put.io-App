import React, {PropTypes} from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
} from 'material-ui/Table';
import FilesRow from './FilesRow';

export default class FilesTable extends React.Component {
    render() {
        const {parent, files, cellClick} = this.props;

        let rows = [];

        files.forEach((file) => {
            rows.push(
                <FilesRow key={file.id} file={file} />
            );
        });

        return (
            <Table multiSelectable={true} onCellClick={cellClick} >
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
                <TableBody key={parent.id} showRowHover={true}>
                    {rows}
                </TableBody>
            </Table>
        );
    }
};

FilesTable.propTypes = {
    parent: PropTypes.object,
    files: PropTypes.array,
    cellClick: PropTypes.func
};
