import React from 'react';
import PropTypes from 'prop-types';
import * as _ from 'lodash';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';
import CircularProgress from 'material-ui/CircularProgress';
import FileIcon from 'material-ui/svg-icons/editor/insert-drive-file';
import FolderIcon from 'material-ui/svg-icons/file/folder';

export default class FileTree extends React.Component {
    state = {
        open: false,
        selected: {}
    }
    componentWillReceiveProps(nextProps) {
        const {filesActions, open, tree} = nextProps;

        if(open && _.isEmpty(tree)) filesActions.tree();

        this.setState({
            open: nextProps.open
        });
    }
    handleChange = (e, selected) => {
        if(selected.file_type === "FOLDER") {
            this.setState({selected});
        }
    }
    handleClose = () => {
        this.setState({
            open: false
        });
    }
    handleMove = () => {
        const {onMove} = this.props;
        const {selected} = this.state;

        onMove(selected);
        this.handleClose();
    }
    render() {
        const {tree} = this.props;
        const {selected} = this.state;

        const createListItem = (node, initiallyOpen = false) => {
            let children = [];

            _.forEach(node.children, function(child) {
                children.push(createListItem(child));
            });

            return (
                <ListItem
                    key={node.id}
                    primaryText={node.name}
                    leftIcon={(node.file_type === "FOLDER") ? <FolderIcon /> : <FileIcon /> }
                    initiallyOpen={initiallyOpen}
                    primaryTogglesNestedList={false}
                    onClick={(e) => {this.handleChange(e, node)}}
                    nestedItems={children}
                />
            );
        };

        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label={(_.isEmpty(selected)) ? "Move" : "Move to " + selected.name}
                primary={true}
                onTouchTap={this.handleMove}
            />,
        ];

        return (
            <Dialog
                title={(_.isEmpty(selected)) ? "Move" : "Move to " + selected.name}
                actions={actions}
                modal={false}
                autoScrollBodyContent={true}
                open={this.state.open}
                onRequestClose={this.handleClose}
                bodyStyle={{
                    minHeight: 499
                }}
            >
                <List>
                    {(_.isEmpty(tree)) ?
                        <CircularProgress
                            size={100}
                            thickness={5}
                            style={{
                                margin: "50px auto",
                                display: "block"
                            }}
                        /> : createListItem(tree, true)}
                </List>
            </Dialog>

        );
    }
};

FileTree.propTypes = {
    tree: PropTypes.object,
    open: PropTypes.bool,
    onMove: PropTypes.func.isRequired,
    filesActions: PropTypes.shape({
        tree: PropTypes.func.isRequired
    })
};
