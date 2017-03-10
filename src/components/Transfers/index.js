import React from 'react';
import * as _ from 'lodash';
import {Col, Row} from 'react-flexbox-grid/lib';
import Paper from 'material-ui/Paper';
import {List} from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import ClearIcon from 'material-ui/svg-icons/communication/clear-all';
import TransferItem from './TransferItem';

export default class Transfers extends React.Component {
    constructor(props) {
        super(props);

        this.handleClean = this.handleClean.bind(this);
        this.handleCancel = this.handleCancel.bind(this);

        const {transfersActions} = props;

        transfersActions.getAll();

        this.state = {
            interval: setInterval(() => {
                transfersActions.getAll();
            }, 3000)
        };
    }
    componentWillUnmount() {
        clearInterval(this.state.interval);
    }
    handleClean(e) {
        e.preventDefault();

        const {transfersActions} = this.props;

        transfersActions.clean();
    }
    handleCancel(id, e) {
        e.preventDefault();

        const {transfersActions} = this.props;

        transfersActions.cancel(id);
    }
    render() {
        const {transfers} = this.props;

        if (_.isEmpty(transfers)) {
            return (
                <Col id="Transfers" xs={12}>
                    <h2 style={{
                        textAlign: 'center'
                    }}>No Transfers</h2>
                </Col>
            );
        } else {
            let listItems = [];

            transfers.forEach((transfer) => {
                listItems.push(<TransferItem key={transfer.id} transfer={transfer} cancel={this.handleCancel}/>);
            });

            return (
                <Col id="Transfers" xs={12}>
                    <Row style={{
                        marginBottom: 10
                    }} end="xs">
                        <RaisedButton label="Clear Finished" labelPosition="after" primary={true} icon={<ClearIcon />} onClick={this.handleClean}/>
                    </Row>
                    <Row>
                        <Paper style={{
                            width: '100%'
                        }} zDepth={1}>
                            <List>
                                {listItems}
                            </List>
                        </Paper>
                    </Row>
                </Col>
            );
        }
    }
};
