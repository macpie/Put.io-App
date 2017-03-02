import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import Popover from 'material-ui/Popover';

export default class DiskBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false
        };
    }
    handleMouseOver = (e) => {
        e.preventDefault();

        this.setState({open: true, anchorEl: e.currentTarget});

        setTimeout(() => {
            this.setState({open: false});
        }, 3000);
    }
    handleRequestClose = () => {
        this.setState({open: false});
    }
    render() {
        const {value, popover} = this.props;

        let color = 'white';

        if(value >= 75) {
            color = 'red';
        } else if (value >= 50 && value < 75) {
            color = 'orange';
        } else {
            color = 'green';
        }

        return (
            <div>
                <CircularProgress onMouseOver={this.handleMouseOver} mode="determinate" color={color} value={value}/>
                <Popover open={this.state.open} anchorEl={this.state.anchorEl} anchorOrigin={{
                    horizontal: 'left',
                    vertical: 'top'
                }} targetOrigin={{
                    horizontal: 'middle',
                    vertical: 'bottom'
                }} style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.75)',
                    padding: 5,
                    borderRadius: 10
                }} >
                    {popover}
                </Popover>
            </div>
        );
    }
};
