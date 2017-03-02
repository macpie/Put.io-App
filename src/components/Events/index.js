import React from 'react';
import moment from 'moment';
import {Col} from 'react-flexbox-grid/lib';
import Paper from 'material-ui/Paper';
import {Tabs, Tab} from 'material-ui/Tabs';
import Badge from 'material-ui/Badge';
import EventsList from './EventsList';

export default class Events extends React.Component {
    constructor(props) {
        super(props);

        const {eventsActions} = props;

        eventsActions.getAll();
    }
    render() {
        let todayEvents = [],
            weekEvents = [],
            monthEvents = [],
            day = moment().subtract(1, 'days'),
            week = moment().subtract(1, 'weeks'),
            month = moment().subtract(1, 'months'),
            badgeStyle = {
                top: 10,
                width: 20,
                height: 20
            };

        this
            .props
            .events
            .forEach((e) => {
                let date = moment(e.created_at);

                if (date.isAfter(day)) {
                    todayEvents.push(e);
                }
                if (date.isAfter(week) && date.isBefore(day)) {
                    weekEvents.push(e);
                }
                if (date.isAfter(month) && date.isBefore(week)) {
                    monthEvents.push(e);
                }

            });

        return (
            <Col id="Events" xs={12}>
                <Paper zDepth={1}>
                    <Tabs>
                        <Tab label={<Badge secondary={true} badgeStyle={badgeStyle} badgeContent={todayEvents.length}>Today</Badge>}>
                            <EventsList events={todayEvents} />
                        </Tab>
                        <Tab label={<Badge secondary={true} badgeStyle={badgeStyle} badgeContent={weekEvents.length}>Last Week</Badge>}>
                            <EventsList events={weekEvents} />
                        </Tab>
                        <Tab label={<Badge secondary={true} badgeStyle={badgeStyle} badgeContent={monthEvents.length}>Last Month</Badge>}>
                            <EventsList events={monthEvents} />
                        </Tab>
                    </Tabs>
                </Paper>
            </Col>
        );
    }
};
