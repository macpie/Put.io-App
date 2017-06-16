import React from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import ConvertIcon from 'material-ui/svg-icons/image/switch-video';

export default class FileVideo extends React.Component {
    componentDidMount() {
        const {file, convert} = this.props;

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

        if(file.need_convert) {
            convert(file.id);
        }

        this.player = videojs(this.videoNode, options, () => {});
    }
    componentWillUnmount() {
        if (this.player) {
            this
                .player
                .dispose();
        }
    }
    render() {
        const {mp4} = this.props;

        const convertStatus = () => {
            if(mp4.status) {
                const done = mp4.percent_done || 0;
                return (
                    <Chip style={{
                        top: '50%',
                        position: 'fixed',
                        left: '35%'
                    }}>
                        <Avatar icon={<ConvertIcon />} />
                        Converting: {mp4.status} {done}%
                    </Chip>
                );
            } else {
                return null
            }
        }

        return (
            <div style={{
                textAlign: 'center',
                padding: 20,
                backgroundColor: 'black',
                marginTop: 1
            }}>
                {convertStatus()}
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
