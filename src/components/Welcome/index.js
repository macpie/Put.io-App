import React from 'react';
import {Col} from 'react-flexbox-grid/lib';

export default class Welcome extends React.Component {
    componentWillMount() {
        const {user, replace, redirect} = this.props;
        if (user.access_token) {
            replace(redirect)
        }
    }

    componentWillReceiveProps(nextProps) {
        const {user, replace, redirect} = nextProps;

        if (user.access_token) {
            replace(redirect)
        }
    }
    render() {
        return (
            <Col id="Welcome" xs={12}>
                <h1>Welcome Page</h1>
            </Col>
        );
    }
};
