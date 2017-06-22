import React from 'react';
import PropTypes from 'prop-types';
import Chip from 'material-ui/Chip';

export default class DiskBar extends React.Component {
    render() {
        const {disk} = this.props;

        if(disk && disk.used) {
            return (
                <div id="DiskBar">
                    <Chip
                        style={{backgroundColor: "rgb(255, 64, 129)"}}
                        labelStyle={{fontWeight: "bold", color: "white"}}
                    >
                        {Math.round(((100 * disk.used) / disk.size)) + " %"}
                    </Chip>
              </div>
            );
        } else {
            return null;
        }
    }
};

DiskBar.propTypes = {
    disk: PropTypes.object
};
