import React, {PropTypes} from 'react';
import * as _ from 'lodash';
import {List, ListItem} from 'material-ui/List';
import DateRangeIcon from 'material-ui/svg-icons/action/date-range';
import FileIcon from 'material-ui/svg-icons/editor/insert-drive-file';
import AccountIcon from 'material-ui/svg-icons/action/account-circle';
import * as utility from '../../utils';

export default class EventsList extends React.Component {
    render() {
        const {events, select} = this.props;

        if (_.isEmpty(events)) {
            return (
                <h2 style={{
                    textAlign: 'center'
                }}>No events</h2>
            );
        } else {
            let listItem = [],
                style = {
                    height: 16,
                    width: 16,
                    margin: '0 2 0 12',
                    color: 'rgba(0, 0, 0, 0.541176)'
                };

            events.forEach((e) => {
                let pText = (
                        <h3 style={{
                            margin: '5px 0',
                            wordBreak: 'break-all'
                        }}>{e.transfer_name || e.file_name}</h3>
                    ),
                    sText = (
                        <span>
                            <FileIcon style={style}/> {utility.bytesToString(e.transfer_size || e.file_size)}
                            <DateRangeIcon style={style}/> {utility.printDate(e.created_at)}
                            <AccountIcon style={style}/> {e.sharing_user_name || "Me"}
                        </span>
                    );

                listItem.push(
                    <ListItem
                        innerDivStyle={{
                            paddingTop: 5,
                            paddingBittom: 5
                        }}
                        key={e.id}
                        primaryText={pText}
                        secondaryText={sText}
                        onClick={(ev) => {select(e, ev)}}
                    />
                );
            });

            return (
                <List>
                    {listItem}
                </List>
            );
        }

    }
};

EventsList.propTypes = {
    events: PropTypes.array.isRequired,
    select: PropTypes.func.isRequired
}
