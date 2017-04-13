import React from 'react';
import {Tab} from 'material-ui/Tabs';
import Badge from 'material-ui/Badge';
import EventsList from './EventsList';

export default function(title, events, onSelect)  {
    if(!events.length) {
        return null;
    } else {
        return (
            <Tab label={<Badge secondary={true} badgeStyle={{
                top: 10,
                width: 20,
                height: 20
            }} badgeContent={events.length}>{title}</Badge>}>
                <EventsList events={events} onSelect={onSelect} />
            </Tab>
        );
    }
};
