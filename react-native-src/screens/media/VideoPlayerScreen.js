import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { VlCPlayerView, VLCPlayer } from 'react-native-vlc-media-player';
//import Video from 'react-native-video';
import _ from 'lodash';
import Orientation from 'react-native-orientation';
import { Button } from 'react-native-elements';
// import VLCPlayer from 'react-native-vlc-media-player/VLCPlayer';

export default class VideoPlayerScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            paused: false,
            video: _.get(props, 'route.params.video', {}),
        };
    }
    componentDidMount() {}
    pause = () => {
        let { paused } = this.state;
        this.setState({
            paused: !paused,
        });
    };
    seek = () => {
        console.log('aaa');
        // console.log(this.vlcplayer);
        if (this.vlcplayer) {
            this.vlcplayer.seek(0.7);
        }

        this.pause();
    };

    onPaused = event => {
        console.log(event);
    };
    onProgress = event => {
        console.log(event);
    };
    render() {
        const { video } = this.state;
        // console.log('video', video);
        return (
            <View style={styles.container}>
                <VLCPlayer
                    ref={ref => (this.vlcplayer = ref)}
                    source={{ uri: video.cdnUrl }}
                    style={{ height: 300 }}
                    paused={this.state.paused}
                    onProgress={this.onProgress}
                    onPaused={this.onPaused}
                />
                <Button title={'seek'} onPress={this.seek} style={{ padding: 12 }} />
                <Button title={'pause'} onPress={this.pause} />
                {/*<VlCPlayerView*/}
                {/*    autoplay={true}*/}
                {/*    url={video.cdnUrl}*/}
                {/*    Orientation={Orientation}*/}
                {/*    showGG={false}*/}
                {/*    showTitle={true}*/}
                {/*    title={video.filePath}*/}
                {/*    showBack={true}*/}
                {/*    onLeftPress={() => {}}*/}
                {/*    // startFullScreen={() => {*/}
                {/*    //     this.setState({*/}
                {/*    //         isFull: true,*/}
                {/*    //     });*/}
                {/*    // }}*/}
                {/*    // closeFullScreen={() => {*/}
                {/*    //     this.setState({*/}
                {/*    //         isFull: false,*/}
                {/*    //     });*/}
                {/*    // }}*/}
                {/*/>*/}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.black,
    },
    body: {
        backgroundColor: Colors.white,
    },
    backgroundVideo: {
        height: 600,
    },
});
