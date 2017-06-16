import React from 'react';
import Chip from 'material-ui/Chip';

export default class DiskBar extends React.Component {
    render() {
        const {disk} = this.props;

        return (
            <div id="DiskBar">
                <Chip
                    style={{backgroundColor: 'rgb(255, 64, 129)'}}
                    labelStyle={{fontWeight: 'bold', color: 'white'}}
                >
                    {Math.round(((100 * disk.used) / disk.size)) + ' %'}
                </Chip>
          </div>
        );
    }
};
