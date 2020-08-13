import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    Platform,
    Text,
    ActivityIndicator,
    Pressable,
} from 'react-native';
import { VLCPlayer } from 'react-native-vlc-media-player';
import PropTypes from 'prop-types';
import TimeLimt from './TimeLimit';
import ControlBtn from './ControlBtn';
import { getStatusBarHeight } from './SizeController';
const statusBarHeight = getStatusBarHeight();
export default class VLCPlayerView extends Component {
    static propTypes = {
        uri: PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.state = {
            paused: true,
            isLoading: true,
            loadingSuccess: false,
            isFull: false,
            currentTime: 0.0,
            totalTime: 0.0,
            showControls: false,
            seek: 0,
            isError: false,
        };
        this.touchTime = 0;
        this.changeUrl = false;
        this.isEnding = false;
        this.reloadSuccess = false;
    }

    static defaultProps = {
        initPaused: false,
        source: null,
        seek: 0,
        playInBackground: false,
        isGG: false,
        autoplay: true,
        errorTitle: 'Error play video, please try again',
    };

    componentDidMount() {
        // if (this.props.isFull) {
        //     this.setState({
        //         showControls: true,
        //     });
        // }
    }

    componentWillUnmount() {
        // this.vlcPlayer.onStopped();

        if (this.bufferInterval) {
            clearInterval(this.bufferInterval);
            this.bufferInterval = null;
        }
    }

    // componentDidUpdate(prevProps, prevState) {
    //     if (this.props.uri !== prevProps.uri) {
    //         console.log('componentDidUpdate');
    //         this.changeUrl = true;
    //     }
    // }
    onPlaying = () => {
        this.setState({ isLoading: false });
    };
    renderControlBar = () => {
        return null;
    };
    render() {
        const { url } = this.props;
        const { isLoading } = this.state;
        return (
            <View style={{ flex: 1, backgroundColor: 'transparent' }}>
                <View
                    style={{
                        width: '100%',
                        height: 300,
                        backgroundColor: 'black',
                        justifyContent: 'center',
                    }}
                >
                    <VLCPlayer
                        style={{ width: Dimensions.get('window').width, height: 300 }}
                        source={{ uri: url }}
                        initType={2}
                        initOptions={[
                            '--network-caching=' + 150,
                            '--rtsp-caching=' + 150,
                            '--no-stats',
                            '--tcp-caching=' + 150,
                            '--realrtsp-caching=' + 150,
                        ]}
                        onPlaying={this.onPlaying}
                    />
                    {this.renderControlBar()}
                    {/*<Loader loading={isLoading} transparent />*/}
                </View>
                {isLoading ? (
                    <View style={{ padding: 12, flexDirection: 'row', alignItems: 'center' }}>
                        <View
                            style={{
                                width: 12,
                                height: 12,
                                borderRadius: 6,
                                backgroundColor: 'grey',
                                marginRight: 12,
                            }}
                        />
                        <Text style={{ fontSize: 20 }}>Đang kết nối đến camera</Text>
                    </View>
                ) : (
                    <View
                        style={{
                            backgroundColor: 'red',
                            position: 'absolute',
                            padding: 6,
                            borderRadius: 6,
                            margin: 12,
                        }}
                    >
                        <Text style={{ color: '#fff' }}>LIVE</Text>
                    </View>
                )}
                {/*<Text>Theo dõi trực tiếp camera</Text>*/}
            </View>
        );
    }

    /**
     * 视屏播放
     * @param event
     */
    // onPlaying(event) {
    //     this.isEnding = false;
    //     // if (this.state.paused) {
    //     //   this.setState({ paused: false });
    //     // }
    //     console.log('onPlaying');
    // }

    /**
     * 视屏停止
     * @param event
     */
    onPaused(event) {
        // if (!this.state.paused) {
        //   this.setState({ paused: true, showControls: true });
        // } else {
        //   this.setState({ showControls: true });
        // }
        console.log('onPaused');
    }

    /**
     * 视屏缓冲
     * @param event
     */
    onBuffering(event) {
        this.setState({
            isLoading: true,
            isError: false,
        });
        this.bufferTime = new Date().getTime();
        if (!this.bufferInterval) {
            this.bufferInterval = setInterval(this.bufferIntervalFunction, 250);
        }
        console.log('onBuffering');
        console.log(event);
    }

    bufferIntervalFunction = () => {
        console.log('bufferIntervalFunction');
        let currentTime = new Date().getTime();
        let diffTime = currentTime - this.bufferTime;
        if (diffTime > 1000) {
            clearInterval(this.bufferInterval);
            this.setState(
                {
                    paused: true,
                },
                () => {
                    this.setState({
                        paused: false,
                        isLoading: false,
                    });
                }
            );
            this.bufferInterval = null;
            console.log('remove  bufferIntervalFunction');
        }
    };

    _onError = e => {
        // [bavv add start]
        let { onVLCError } = this.props;
        onVLCError && onVLCError();
        // [bavv add end]
        console.log('_onError');
        console.log(e);
        this.reloadSuccess = false;
        this.setState({
            isError: true,
        });
    };

    _onOpen = e => {
        console.log('onOpen', e);
    };

    _onLoadStart = e => {
        console.log('_onLoadStart');
        console.log(e);
        let { isError } = this.state;
        if (isError) {
            this.reloadSuccess = true;
            let { currentTime, totalTime } = this.state;
            if (Platform.OS === 'ios') {
                this.vlcPlayer.seek(Number((currentTime / totalTime).toFixed(17)));
            } else {
                this.vlcPlayer.seek(currentTime);
            }
            this.setState(
                {
                    paused: true,
                    isError: false,
                },
                () => {
                    this.setState({
                        paused: false,
                    });
                }
            );
        } else {
            this.vlcPlayer.seek(0);
            this.setState(
                {
                    isLoading: true,
                    isError: false,
                    loadingSuccess: false,
                    paused: true,
                    currentTime: 0.0,
                    totalTime: 0.0,
                },
                () => {
                    this.setState({
                        paused: false,
                    });
                }
            );
        }
    };

    _reload = () => {
        if (!this.reloadSuccess) {
            this.vlcPlayer.resume && this.vlcPlayer.resume(false);
        }
    };

    /**
     * 视屏进度变化
     * @param event
     */
    onProgress(event) {
        /* console.log(
         'position=' +
         event.position +
         ',currentTime=' +
         event.currentTime +
         ',remainingTime=' +
         event.remainingTime,
         );*/
        let currentTime = event.currentTime;
        let loadingSuccess = false;
        if (currentTime > 0 || this.state.currentTime > 0) {
            loadingSuccess = true;
        }
        if (!this.changingSlider) {
            if (currentTime === 0 || currentTime === this.state.currentTime * 1000) {
            } else {
                this.setState({
                    loadingSuccess: loadingSuccess,
                    isLoading: false,
                    isError: false,
                    progress: event.position,
                    currentTime: event.currentTime / 1000,
                    totalTime: event.duration / 1000,
                });
            }
        }
    }

    /**
     * 视屏播放结束
     * @param event
     */
    onEnded(event) {
        console.log('onEnded ---------->');
        console.log(event);
        console.log('<---------- onEnded ');
        let { currentTime, totalTime } = this.state;
        // [bavv add start]
        let { onVLCEnded, onEnd, autoplay, isGG } = this.props;
        onVLCEnded && onVLCEnded();
        // [bavv add end]
        if ((currentTime + 5 >= totalTime && totalTime > 0) || isGG) {
            this.setState(
                {
                    paused: true,
                    //showControls: true,
                },
                () => {
                    if (!this.isEnding) {
                        onEnd && onEnd();
                        if (!isGG) {
                            this.vlcPlayer.resume && this.vlcPlayer.resume(false);
                            console.log(this.props.uri + ':   onEnded');
                        } else {
                            console.log('片头：' + this.props.uri + ':   onEnded');
                        }
                        this.isEnding = true;
                    }
                }
            );
        } else {
            console.log('onEnded   error:' + this.props.uri);
            this.vlcPlayer.resume && this.vlcPlayer.resume(false);
            this.setState(
                {
                    paused: true,
                },
                () => {
                    console.log('onEnded   error:' + this.props.uri);
                    this.reloadSuccess = false;
                    this.setState({
                        isError: true,
                    });
                }
            );
        }
    }

    /**
     * 全屏
     * @private
     */
    _toFullScreen = () => {
        let { startFullScreen, closeFullScreen, isFull } = this.props;
        if (isFull) {
            closeFullScreen && closeFullScreen();
        } else {
            startFullScreen && startFullScreen();
        }
    };

    /**
     * 播放/停止
     * @private
     */
    _play = () => {
        this.setState({ paused: !this.state.paused });
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    videoBtn: {
        flex: 1,
    },
    video: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
    },
    loading: {
        position: 'absolute',
        left: 0,
        top: 0,
        zIndex: 0,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    GG: {
        backgroundColor: 'rgba(255,255,255,1)',
        height: 30,
        marginRight: 10,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    topView: {
        top: Platform.OS === 'ios' ? statusBarHeight : 0,
        left: 0,
        height: 45,
        position: 'absolute',
        width: '100%',
        //backgroundColor: 'red'
    },
    bottomView: {
        bottom: 0,
        left: 0,
        height: 50,
        position: 'absolute',
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0)',
    },
    backBtn: {
        height: 45,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    indicator: {
        position: 'absolute',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    btn: {
        marginLeft: 10,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
        height: 40,
        borderRadius: 20,
        width: 40,
        paddingTop: 3,
    },
});
