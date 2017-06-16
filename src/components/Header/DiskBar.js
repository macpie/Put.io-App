import React from 'react';
import Chip from 'material-ui/Chip';
import * as Utils from '../../utils';

export default class DiskBar extends React.Component {
    render() {
        const {disk} = this.props;

        let value = Math.round(((100 * disk.used) / disk.size)),
            color = 'white';

        if (value >= 75) {
            color = 'red';
        } else if (value >= 50 && value < 75) {
            color = 'orange';
        } else {
            color = 'green';
        }

        return (
            <div id="DiskBar">
                <Chip
                    style={{backgroundColor: 'rgb(255, 64, 129)'}}
                    labelStyle={{fontWeight: 'bold', color: 'white'}}
                >
                    {value + ' %'}
                </Chip>
          </div>
        );
    }
};
