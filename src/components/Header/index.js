import React from 'react';
import {Col} from 'react-flexbox-grid/lib';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import HeadlineIcon from 'material-ui/svg-icons/action/view-headline';
import DiskBar from './DiskBar';
import * as utility from '../../utils';

export default class Header extends React.Component {
    constructor(props) {
        super(props);

        this.handleMenuClick = this
            .handleMenuClick
            .bind(this);

        const {accountActions} = props;

        accountActions.getInfo();
    }
    handleMenuClick() {
        const {menuActions} = this.props;

        menuActions.toggle();
    }
    render() {
        const {disk} = this.props.account;

        let value = 0,
            popover = '';

        if (disk) {
            value = Math.round(((100 * disk.used) / disk.size));
            popover += value + '% ';
            popover += utility.bytesToString(disk.used) + ' / ' + utility.bytesToString(disk.size);
        }

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
                        <DiskBar value={value} popover={popover}/>
                    </ToolbarGroup>
                </Toolbar>
            </Col>
        );
    }
};
