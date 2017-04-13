import React from 'react';
import moment from 'moment';
import {Col} from 'react-flexbox-grid/lib';
import Paper from 'material-ui/Paper';
import {Tabs} from 'material-ui/Tabs';
import EventTab from './EventTab';

export default class Events extends React.Component {
    constructor(props) {
        super(props);

        const {eventsActions} = props;

        eventsActions.getAll();
    }
    handleOnSelect = (event, e) => {
        const {goTo} = this.props;

        if (event.file_id) {
            goTo("/files/" + event.file_id);
        }
    }
    render() {
        let todayEvents = [],
            weekEvents = [],
            monthEvents = [],
            day = moment().subtract(1, 'days'),
            week = moment().subtract(1, 'weeks'),
            month = moment().subtract(1, 'months');

        this
            .props
            .events
            .forEach((e) => {
                let date = moment(e.created_at);

                if (e.type === 'transfer_completed') {
                    if (date.isAfter(day)) {
                        todayEvents.push(e);
                    }
                    if (date.isAfter(week) && date.isBefore(day)) {
                        weekEvents.push(e);
                    }
                    if (date.isAfter(month) && date.isBefore(week)) {
                        monthEvents.push(e);
                    }
                }
            });

        return (
            <Col id="Events" xs={12}>
                <Paper zDepth={1}>
                    <Tabs>
                        {EventTab('Today', todayEvents, this.handleOnSelect)}
                        {EventTab('Last Week', weekEvents, this.handleOnSelect)}
                        {EventTab('Last Month', monthEvents, this.handleOnSelect)}
                    </Tabs>
                </Paper>
            </Col>
        );
    }
};
