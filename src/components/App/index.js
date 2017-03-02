import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Grid, Row} from 'react-flexbox-grid/lib';
import Header from '../../containers/Header';

export default class App extends React.Component {
    render() {
        return (
            <MuiThemeProvider>
                <Grid fluid={true} style={{
                    paddingLeft: 5,
                    paddingRight: 5
                }}>
                    <Row style={{
                        marginBottom: 20
                    }}>
                        <Header />
                    </Row>
                    <Row>
                        {this.props.children}
                    </Row>
                </Grid>
            </MuiThemeProvider>
        );
    }
};
