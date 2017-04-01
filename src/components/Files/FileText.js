import React from 'react';
import * as _ from 'lodash';
import CircularProgress from 'material-ui/CircularProgress';

export default class FileText extends React.Component {
    constructor(props) {
        super(props);

        const {file, filesActions} = props;

        filesActions.getTextFile(file.id);
    }
    componentWillUnmount() {
        const {filesActions} = this.props;

        filesActions.clearStream();
    }
    render() {
        const {content} = this.props;

        if (content === null) {
            return (
                <div style={{
                    textAlign: "center",
                    padding: 20
                }}>
                    <CircularProgress/>
                </div>
            );
        }

        return (
            <p style={{
                textAlign: "center",
                padding: 20,
                margin: 0
            }}>{content}</p>
        );
    }
};
