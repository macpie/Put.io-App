import React, {PropTypes} from 'react';
import {Table, TableBody, TableRow, TableHeader, TableHeaderColumn} from 'material-ui/Table';
import FilesRow from './FilesRow';
import * as _ from 'lodash';

export default class FilesTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            openMenu: false
        };
    }
    render() {
        const {parent, files, rowClick} = this.props;

        let rows = [];

        files.forEach((file) => {
            rows.push(<FilesRow key={file.id} file={file} onClick={(e) => {
                rowClick(file, e)
            }}/>);
        });

        return (
            <Table multiSelectable={false} selectable={false}>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                    <TableRow>
                        <TableHeaderColumn style={{
                            width: 24
                        }}>
                            Type
                        </TableHeaderColumn>
                        <TableHeaderColumn>
                            Name
                        </TableHeaderColumn>
                        <TableHeaderColumn style={{
                            width: 75
                        }}>
                            Size
                        </TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody key={parent.id} showRowHover={true} displayRowCheckbox={false}>
                    {rows}
                </TableBody>
            </Table>
        );

    }
};

FilesTable.propTypes = {
    parent: PropTypes.object,
    files: PropTypes.array,
    rowClick: PropTypes.func
};
