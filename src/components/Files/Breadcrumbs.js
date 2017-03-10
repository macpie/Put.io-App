import React from 'react';
import * as _ from 'lodash';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import ChevronIcon from 'material-ui/svg-icons/navigation/chevron-right';

export default class Breadcrumbs extends React.Component {
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
                    cursor: 'pointer'
                }}/>);
                rows.push(<ChevronIcon key={id + "-icon"} style={{
                    paddingRight: 16
                }}/>);
            });
        }

        if (!_.isEmpty(parent)) {
            rows.push(<ToolbarTitle key={parent.id} text={parent.name}/>);
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
