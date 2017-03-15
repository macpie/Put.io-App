import React, {PropTypes} from 'react';
import {Table, TableBody, TableRow, TableRowColumn, TableHeader} from 'material-ui/Table';
import FilesRow from './FilesRow';
import FilesTableHeader from './FilesTableHeader';
import * as _ from 'lodash';

export default class FilesTable extends React.Component {
    render() {
        const {parent, files, rowClick, selected, select, selectAll, menuSelect} = this.props;

        const content = () => {
            if(_.isEmpty(files)) {
                return (
                    <TableRow>
                        <TableRowColumn style={{textAlign: 'center'}}>Nothing</TableRowColumn>
                    </TableRow>
                );
            } else {
                let rows = [];

                files.forEach((file) => {
                    const checked = (_.indexOf(selected, file.id) === -1) ? false : true;

                    rows.push(<FilesRow key={file.id} file={file} onClick={(e) => {
                        rowClick(file, e)
                    }} checked={checked} onSelect={select} />);
                });

                return rows;
            }
        };

        return (
            <Table multiSelectable={false} selectable={false}>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                    <FilesTableHeader selectAll={selectAll} menuSelect={menuSelect} />
                </TableHeader >
                <TableBody key={parent.id} showRowHover={true} displayRowCheckbox={false}>
                    {content()}
                </TableBody>
            </Table>
        );

    }
};

FilesTable.propTypes = {
    parent: PropTypes.object,
    files: PropTypes.array,
    rowClick: PropTypes.func,
    menuSelect: PropTypes.func
};
