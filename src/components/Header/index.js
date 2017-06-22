import React from 'react';
import {Col} from 'react-flexbox-grid/lib';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import HeadlineIcon from 'material-ui/svg-icons/action/view-headline';
import DiskBar from './DiskBar';

export default class Header extends React.Component {
    constructor(props) {
        super(props);

        const {accountActions} = props;

        accountActions.info();
    }
    handleMenuClick = () => {
        const {menuActions} = this.props;

        menuActions.toggle();
    }
    render() {
        const {disk} = this.props.account;

        return (
            <Col id="Header" xs={12}>
                <Toolbar style={{
                    backgroundColor: "rgb(0, 188, 212)",
                    position: "static",
                    width: "100%",
                    zIndex: 2
                }}>
                    <ToolbarGroup firstChild={true}>
                        <IconButton onClick={this.handleMenuClick} style={{
                            height: "100%"
                        }} children={<HeadlineIcon color="white" />}/>
                        <ToolbarTitle text="Put.io" style={{
                            color: "white"
                        }}/>
                    </ToolbarGroup>
                    <ToolbarGroup style={{
                        marginRight: 0
                    }} lastChild={true}>
                        <DiskBar disk={disk || {}}/>
                    </ToolbarGroup>
                </Toolbar>
            </Col>
        );
    }
};
