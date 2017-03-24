import React from 'react';
import LoadingBar from 'react-redux-loading-bar'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Grid, Row} from 'react-flexbox-grid/lib';
import Header from '../../containers/Header';
import Menu from '../Menu';

export default class App extends React.Component {
    render() {
        const {menu, menuActions, routeActions} = this.props;

        return (
            <MuiThemeProvider>
                <Grid fluid={true} style={{
                    paddingLeft: 5,
                    paddingRight: 5
                }}>
                    <LoadingBar
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            backgroundColor: 'rgb(0, 188, 212)',
                            height: 2
                        }}
                    />
                    <Menu open={menu} menuToggle={menuActions.toggle} push={routeActions.push} />
                    <Row style={{
                        marginBottom: 20
                    }}>
                        <Header/>
                    </Row>
                    <Row style={{
                        marginRight: 0,
                        marginLeft: 0
                    }}>
                        {this.props.children}
                    </Row>
                </Grid>
            </MuiThemeProvider>
        );
    }
};
