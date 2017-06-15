import React from 'react';
import {Col} from 'react-flexbox-grid/lib';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import * as Storage from '../../utils/Storage';

export default class Settings extends React.Component {
    constructor(props) {
        super(props);

        const {user, replace, location} = this.props;

        this.state = {
            value: user.access_token || ''
        };

        if (user.access_token && !location.query.stopRedirect) {
            replace(location.query.redirect || '/events');
        }
    }
    componentWillReceiveProps(nextProps) {
        const {user, replace, location} = nextProps;

        this.setState({
            value: user.access_token || ''
        });

        if (user.access_token && !location.query.stopRedirect) {
            replace(location.query.redirect || '/events');
        }
    }
    handleChange = (e, value) => {
        this.setState({
            value: value,
        });
    }
    handleSave = (e) => {
        e.preventDefault();

        const {authActions, replace} = this.props;

        Storage.setItem('access_token', this.state.value);
        authActions.fetchToken();

        replace('/events');
    }
    render() {
        return (
            <Col id="Settings" xs={12}>
                <Paper style={{
                        padding: 5,
                        textAlign: 'center'
                    }} zDepth={1}>
                    <TextField
                        inputStyle={{
                            textAlign: 'center'
                        }}
                        floatingLabelText="Access Token"
                        name="access_token"
                        value={this.state.value}
                        onChange={this.handleChange}
                    />
                    <RaisedButton style={{
                            marginLeft: 10,
                        }} label="Save" primary={true} onClick={this.handleSave} />
                </Paper>
            </Col>
        );
    }
};
