import React from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

export default class FileVideo extends React.Component {
    componentDidMount() {
        const {file} = this.props;

        const options = {
            controls: true,
            preload: 'auto',
            poster: file.screenshot,
            sources: [
                {
                    src: file.mp4_stream_url || file.stream_url,
                    type: 'video/mp4'
                }
            ]
        };

        this.player = videojs(this.videoNode, options, () => {
            console.log('onPlayerReady', this)
        });
    }
    componentWillUnmount() {
        if (this.player) {
            this
                .player
                .dispose();
        }
    }
    render() {
        return (
            <div style={{
                textAlign: 'center',
                padding: 20,
                backgroundColor: 'black',
                marginTop: 1
            }}>
                <div data-vjs-player>
                    <video ref={node => this.videoNode = node} className="video-js" style={{
                        width: '100%',
                        height: 500
                    }}></video>
                </div>
            </div>
        );
    }
};
