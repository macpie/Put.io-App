import React from 'react';
import PropTypes from 'prop-types';
import {Table, TableBody, TableRow, TableRowColumn, TableHeader} from 'material-ui/Table';
import FilesRow from './FilesRow';
import FilesTableHeader from './FilesTableHeader';
import * as _ from 'lodash';

export default class FilesTable extends React.Component {
    render() {
        const {parent, files, onRowClick, selected, onSelect, onSelectAll, onMenuSelect} = this.props;

        const content = () => {
            if(_.isEmpty(files)) {
                return (
                    <TableRow>
                        <TableRowColumn style={{textAlign: "center"}}>Nothing</TableRowColumn>
                    </TableRow>
                );
            } else {
                let rows = [];

                files.forEach((file) => {
                    const checked = (_.indexOf(selected, file.id) === -1) ? false : true;

                    rows.push(<FilesRow key={file.id} file={file} onClick={(e) => {
                        onRowClick(file, e)
                    }} checked={checked} onSelect={onSelect} />);
                });

                return rows;
            }
        };

        return (
            <Table multiSelectable={false} selectable={false}>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                    <FilesTableHeader onSelectAll={onSelectAll} onMenuSelect={onMenuSelect} />
                </TableHeader >
                <TableBody key={parent.id} showRowHover={true} displayRowCheckbox={false}>
                    {content()}
                </TableBody>
            </Table>
        );

    }
};

FilesTable.propTypes = {
    files: PropTypes.array,
    parent: PropTypes.object,
    selected: PropTypes.array,
    onSelectAll: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    onRowClick: PropTypes.func.isRequired,
    onMenuSelect: PropTypes.func.isRequired
};
