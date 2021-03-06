import React from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Grid, Row} from 'react-flexbox-grid/lib';
import {NotificationStack} from 'react-notification';
import * as _ from 'lodash';
import Header from '../../containers/Header';
import * as Utils from '../../utils';
import Menu from '../Menu';

export default class App extends React.Component {
    errorToNotifications = (errors) => {
        return _.map(errors, (error) => {
            return {
                isActive: true,
                title: "Error",
                message: Utils.cutString(error.error_message, 50),
                key: error.id,
                action: "Dismiss",
                dismissAfter: 3000,
                onClick: this.handleClick
            };
        });
    }
    constructor(props) {
        super(props);

        const {errors} = this.props;

        this.state = {
            notifications: this.errorToNotifications(errors)
        };
    }
    componentWillReceiveProps(nextProps) {
        const {errors} = nextProps;

        this.setState({
            notifications: this.errorToNotifications(errors)
        });
    }
    handleClick = (notification, deactivate) => {
        const {errorsActions} = this.props;

        deactivate();
        errorsActions.dismiss(notification.key);
    }
    render() {
        const {menu, menuActions, routeActions} = this.props;
        const {notifications} = this.state;

        return (
            <MuiThemeProvider>
                <Grid fluid={true} style={{
                    paddingLeft: 5,
                    paddingRight: 5
                }}>
                    <Menu open={menu} onToggle={menuActions.toggle} onPush={routeActions.push} />
                    <Row style={{
                        marginBottom: 20
                    }}>
                        <Header />
                    </Row>
                    <Row style={{
                        marginRight: 0,
                        marginLeft: 0
                    }}>
                        {this.props.children}
                    </Row>
                    <Row>
                        <NotificationStack
                            notifications={notifications}
                            onDismiss={() => {}}
                       />
                    </Row>
                </Grid>
            </MuiThemeProvider>
        );
    }
};

App.propTypes = {
    errors: PropTypes.array
};
