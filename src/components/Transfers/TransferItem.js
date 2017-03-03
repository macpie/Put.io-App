import React, {PropTypes} from 'react';
import {ListItem} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import LinearProgress from 'material-ui/LinearProgress';
import CheckIncon from 'material-ui/svg-icons/action/check-circle';
import FwIncon from 'material-ui/svg-icons/content/forward';
import DownlaodIncon from 'material-ui/svg-icons/file/cloud-download';
import CancelIncon from 'material-ui/svg-icons/navigation/cancel';
import * as utility from '../../utils';
import {
    COLORS
} from '../../constants';

export default class TransferItem extends React.Component {
    render() {
        const {transfer, cancel} = this.props;

        let leftIcon = (<DownlaodIncon color={COLORS.ORANGE} />),
            righIcon = (<IconButton><CancelIncon color={COLORS.RED} onClick={() => {cancel(transfer.id)}} /></IconButton>);

        if(transfer.status === 'COMPLETED') {
            leftIcon = (<CheckIncon color={COLORS.GREEN} />);
            righIcon = (<IconButton> <FwIncon /> </IconButton>);
        }

        return (
            <ListItem
                key={transfer.id}
                primaryText={<div style={{
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap'}}>{transfer.name}</div> }
                secondaryText={<LinearProgress mode="determinate" value={transfer.percent_done} />}
                leftIcon={leftIcon}
                rightIconButton={righIcon}
                primaryTogglesNestedList={true}
                autoGenerateNestedIndicator={false}
                nestedItems={[
                    <ListItem
                        key={1}
                        primaryText={transfer.status_message}
                    />,
                    <ListItem
                        key={2}
                        primaryText={"Estimated time: " + utility.printDuration(transfer.estimated_time)}
                    />
                ]}
            />
        );
    }
};

TransferItem.propTypes = {
    transfer: PropTypes.object.isRequired,
    cancel: PropTypes.func.isRequired
};
