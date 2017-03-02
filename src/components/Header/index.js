import React from 'react';
import {Col} from 'react-flexbox-grid/lib';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import HeadlineIcon from 'material-ui/svg-icons/action/view-headline';

export default class Header extends React.Component {
    render() {
        return (
            <Col id="Header" xs={12}>
                <Toolbar style={{
                    backgroundColor: "rgb(0, 188, 212)",
                    position: "static",
                    width: "100%",
                    zIndex: 2
                }}>
                    <ToolbarGroup firstChild={true}>
                        <IconButton style={{
                            height: "100%"
                        }} children={<HeadlineIcon color="white" />}/>
                        <ToolbarTitle text="Put.io" style={{
                            color: "white"
                        }}/>
                    </ToolbarGroup>
                    <ToolbarGroup lastChild={true}></ToolbarGroup>
                </Toolbar>
            </Col>
        );
    }
};
