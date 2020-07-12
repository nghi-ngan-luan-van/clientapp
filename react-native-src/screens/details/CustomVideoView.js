import React, { Component } from 'react';
import { ActivityIndicator, Text, View, StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../../utils/AppConfig';
import VLCPlayer from 'react-native-vlc-media-player/VLCPlayer';
import { Icon } from 'react-native-elements';
import Slider from '../../components/slider/Slider';
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    video: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 200,
        width: '100%',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-around',
        width,
    },
});

export default class CustomVideoView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentRate: 0,
            seek: 0,
        };
    }

    onProgress = event => {
        console.log('_onProgress', event);

        let { onProgress } = this.props;
        if (typeof onProgress === 'function') {
            onProgress(event);
        }
    };

    onEnd = () => {
        console.log('_onEnd');
        // call when a video segment stop
        this.setState({
            animating: true,
        });

        let { onEnd } = this.props;
        if (typeof onEnd === 'function') {
            onEnd();
        }
    };

    onPlaying = event => {
        console.log('_onPlaying', this.props.cdnUrl);
        //call every after onLoadStart and after onPaused
        this.setState({
            animating: false,
        });
        let { onPlaying } = this.props;
        if (typeof onPlaying === 'function') {
            onPlaying(event);
        }
    };

    onPaused = event => {
        let { onPaused } = this.props;
        if (typeof onPaused === 'function') {
            onPaused(event);
        }
    };

    onBuffering = event => {
        console.log('onBuffering', event);
        let { onBuffering } = this.props;
        if (typeof onBuffering === 'function') {
            onBuffering(event);
        }
    };
    onLoadStart = event => {
        console.log('onLoadStart', event);
        let { onLoadStart } = this.props;
        if (typeof onLoadStart === 'function') {
            onLoadStart(event);
        }
    };
    onOpen = event => {
        let { onOpen } = this.props;
        if (typeof onOpen === 'function') {
            onOpen(event);
        }
    };
    onStopped = () => {
        console.log('_onStopped');
        let { onStopped } = this.props;
        if (typeof onStopped === 'function') {
            onStopped();
        }
    };

    pause = () => {
        this.setState({
            paused: !this.state.paused,
            animating: true, //to show pausing
        });
    };

    renderSlider() {
        let { currentRate } = this.state;
        const { paused } = this.state;
        const MIN = 0;
        const MAX = 12 * 3600 * 1000;
        return (
            <View style={styles.row}>
                <Icon
                    name={paused ? 'play' : 'pause'}
                    type="font-awesome"
                    color={'#ffffff'}
                    style={{ height: 30, width: 30 }}
                    onPress={this.pause}
                />
                {/*<Button title={this.state.paused ? 'play' : 'pause'} onPress={this.onPausePress} />*/}
                <Slider
                    min={MIN}
                    max={MAX}
                    values={[currentRate]}
                    onChange={this.onValueChange}
                    onChangeFinish={this.onChangeFinish}
                />
            </View>
        );
    }

    render() {
        let { paused, animating } = this.state;
        let { seek, cdnUrl } = this.props;
        if (typeof cdnUrl !== 'string') {
            cdnUrl = 'null';
        }
        console.log('cdnUrl_cdnUrl', cdnUrl);
        return (
            <View style={[styles.video, { backgroundColor: Colors.black }]}>
                <VLCPlayer
                    autoplay={false}
                    paused={paused}
                    // seek={seek}
                    style={styles.video}
                    source={{ uri: cdnUrl }} //this.state.url
                    videoAspectRatio={'16:9'}
                    onProgress={event => this.onProgress(event)}
                    onEnd={this.onEnd}
                    // onStopped={this.onStopped}
                    onPlaying={this.onPlaying}
                    // onBuffering={this.onBuffering}
                    onPaused={this.onPaused}
                    progressUpdateInterval={250}
                    // onOpen={this.onOpen} //ANDROID ONLY
                    // onLoadStart={this.onLoadStart}
                />
                {/*{this.renderSlider()}*/}
                <Text
                    style={{
                        // position: 'absolute',
                        backgroundColor: '#fff',
                        alignSelf: 'flex-start',
                    }}
                >
                    {cdnUrl}
                </Text>
                <ActivityIndicator
                    color={'white'}
                    style={{ position: 'absolute' }}
                    size={'large'}
                    animating={animating}
                />
            </View>
        );
    }
}
