import React from 'react';
import PropTypes from 'prop-types';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import ChevronIcon from 'material-ui/svg-icons/navigation/chevron-right';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import * as _ from 'lodash';

export default class Breadcrumbs extends React.Component {
    handleClick = () => {
        const {edit, parent} = this.props;

        if(_.isFunction(edit)) edit(parent.id, parent.name);
    }
    render() {
        const {breadcrumbs, parent, goTo} = this.props;

        let rows = [];

        if (!_.isEmpty(breadcrumbs)) {
            breadcrumbs.forEach((breadcrumb) => {
                const id = breadcrumb[0];

                rows.push(<ToolbarTitle key={id} text={breadcrumb[1]} onClick={() => {
                    goTo("/files/" + id)
                }} style={{
                    color: 'black',
                    cursor: 'pointer',
                    paddingRight: 5
                }} />);
                rows.push(<ChevronIcon key={id + "-icon"} style={{
                    paddingRight: 5
                }} />);
            });
        }

        if (!_.isEmpty(parent) && parent.id !== 0) {
            rows.push(<ToolbarTitle key={parent.id} text={parent.name} style={{
                paddingRight: 2,
                cursor: 'pointer'
            }} onClick={this.handleClick} />);
            rows.push(<EditIcon key={parent.id + '-edit'} color="rgba(0, 0, 0, 0.4)" style={{
                width: 18,
                height: 18,
                cursor: 'pointer'
            }}  onClick={this.handleClick} />);
        }

        if (!_.isEmpty(parent) && parent.id === 0) {
            rows.push(<ToolbarTitle key={parent.id} text={parent.name} style={{
                color: 'black'
            }} />);
        }

        return (
            <Toolbar id="Breadcrumbs" style={{
                overflow: 'scroll'
            }}>
                <ToolbarGroup>
                    {rows}
                </ToolbarGroup>
            </Toolbar>
        );
    }
};

Breadcrumbs.propTypes = {
    edit: PropTypes.func
};
