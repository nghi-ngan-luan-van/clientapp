import React, { Component } from 'react';
import { StyleSheet, View, Text, Dimensions, Platform, ActivityIndicator } from 'react-native';
import { Icon } from 'react-native-elements';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { VLCPlayer } from 'react-native-vlc-media-player';
import _ from 'lodash';
import Orientation from 'react-native-orientation';
import { Button } from 'react-native-elements';

export default class VideoPlayerScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            paused: false,
            videoLoad: true,
            video: _.get(props, 'route.params.video', {}),
            seekTime: _.get(props, 'route.params.seekTime', 0),
        };
    }
    componentDidMount() {
        if (this.vlcplayer) {
            if (Platform.OS === 'ios') {
                console.log();
                this.vlcplayer.seek(this.state.seekTime / 10000);
            } else {
                console.log(this.vlcplayer);
                console.log('sstate vlcmount', this.state);
                this.vlcplayer.seek(this.state.seekTime / 1000);
            }
        }
    }
    pause = () => {
        let { paused } = this.state;
        this.setState({
            paused: !paused,
        });
    };
    seek = () => {
        console.log('aaa');
        // this.pause();
        if (this.vlcplayer) {
            if (Platform.OS === 'ios') {
                console.log(this.vlcplayer);
                this.vlcplayer.seek(0.1);
            } else {
                this.vlcplayer.seek(this.state.seekTime / 1000);
            }
        }
        // this.pause();
    };

    onPaused = event => {
        console.log(event);
    };
    onProgress = event => {
        console.log(event);
    };
    // capture = async () => {
    //     this.vlcplayer.snapshot(
    //         '/Users/macintoshhd/Documents/clientapp/react-native-src/screens/media/video.png'
    //     );
    // };
    onPlaying = () => {
        this.setState({ videoLoad: false });
    };
    render() {
        const { video, videoLoad } = this.state;
        // console.log('sstate vlc', this.state);
        console.log(video);
        this.seek();
        return (
            <View style={styles.container}>
                <View style={styles.backgroundVideo}>
                    <VLCPlayer
                        style={{ height: 400, width: Dimensions.get('window').width }}
                        ref={ref => (this.vlcplayer = ref)}
                        // url={video.cdnUrl}
                        source={{ uri: video.cdnUrl }}
                        paused={this.state.paused}
                        onProgress={this.onProgress}
                        onPaused={this.onPaused}
                        onPlaying={this.onPlaying}
                    />
                    {/*<Icon type={'ant-design'} name={'camera'} onPress={this.capture} />*/}
                    {/*<Button title={'seek'} onPress={this.seek} style={{ padding: 12 }} />*/}

                    <ActivityIndicator
                        size={'large'}
                        color={'#fff'}
                        animating={videoLoad}
                        style={styles.indicator}
                    />
                </View>
                <View style={{ padding: 12, flexDirection: 'row', alignItems: 'center' }}>
                    <View
                        style={{
                            width: 12,
                            height: 12,
                            borderRadius: 6,
                            backgroundColor: videoLoad ? 'grey' : 'green',
                            marginRight: 12,
                        }}
                    />
                    <Text>Đang tải video</Text>
                </View>
                {/*<Button*/}
                {/*    icon={() => <Icon type={'font-awesome'} name={'play'} />}*/}
                {/*    title={'pause'}*/}
                {/*    onPress={this.pause}*/}
                {/*    style={{ padding: 12 }}*/}
                {/*/>*/}
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

        // backgroundColor: Colors.black,
    },
    body: {
        backgroundColor: Colors.white,
    },
    backgroundVideo: {
        // height: 600,
        backgroundColor: '#000',

        justifyContent: 'center',
        alignItems: 'center',
    },
    indicator: {
        position: 'absolute',
    },
});
