import React, { Component } from 'react';
import CalendarPicker from '../../components/CalendarPicker';
import { getMovingEvents, getBackupVideo } from '../../utils/ApiUtils';
import AsyncStorage from '@react-native-community/async-storage';
import CustomVideoView from './CustomVideoView';
import Orientation from 'react-native-orientation';
import moment from 'moment';
import {
    ActivityIndicator,
    Text,
    View,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
} from 'react-native';
import { Colors } from '../../utils/AppConfig';
import VLCPlayer from 'react-native-vlc-media-player/VLCPlayer';
import { VlCPlayerView } from 'react-native-vlc-media-player';
import { Icon } from 'react-native-elements';
import Slider from '../../components/slider/Slider';
import { AuthContext } from '../../navigation/AppNavigator';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    title: { fontSize: 20, fontWeight: 'bold', marginVertical: 12, color: Colors.purple_blue },
    container: { flex: 1, paddingHorizontal: 12 },
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
    },
    calendar: {
        // flex: 1,
        width: 35,
        resizeMode: 'contain',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
});

class CameraVideosComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCalendar: false,
            loading: true,
            eventList: [],
            video: {},
            backupList: [],
            currentIndex: 0,
            frontVideoState: {
                seek: 0,
                isLoading: true,
                isError: false,
            },
            backVideoState: {
                seek: 0,
                isLoading: true,
                isError: false,
            },
            seek: 0,
            next: true,
            isLoading: true,
            isError: false,
            loadingSuccess: false,
            currentTime: 0.0,
            currentRate: 0.0,
            totalTime: 0.0,
            paused: false,
            animating: true,
            currentDay: '',
            isFull: false,
        };
        this.bufferTime = 0;
        this.tmpDuration = 0;
        this.records = [];
        this.newData = {};
        this.newBackupList = {};
    }

    componentDidMount = async () => {
        const { signOut } = this.props;
        let camera =
            this.props.camera || (this.props.route.params && this.props.route.params.camera);

        let userToken = await AsyncStorage.getItem('userToken');
        await getMovingEvents({ userToken, camera }, respond => {
            if (Array.isArray(respond)) {
                this.setState({ eventList: respond });
            } else {
                typeof signOut === 'function' && signOut();
            }
        });
        await getBackupVideo({ userToken, camera }, respond => {
            if (Array.isArray(respond)) {
                this.setState({ backupList: respond });
            } else {
                typeof signOut === 'function' && signOut();
            }
        });
        this.setState({ loading: false });
        // this.loadItems();
    };

    componentWillUnmount() {}

    onCalendarPress = () => {
        const { showCalendar } = this.state;
        this.setState({ showCalendar: !showCalendar });
    };
    timeToString = time => {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
    };
    // groupBackupListTime = () => {
    //     let { events = [] } = this.props;
    //     events.forEach((value, index, arr) => {
    //         const date = moment(Number(value.timeStart)).startOf('day');
    //         const strDate = this.timeToString(date);
    //         if (!this.newBackupList[strDate]) {
    //             this.newBackupList[strDate] = [];
    //         }
    //         this.newBackupList[strDate].push(value);
    //     });
    // };
    // loadItems = () => {
    //     const time = Date.now();
    //     const strTime = this.timeToString(time);
    //     console.log('time', time, 'strTime', strTime);
    //     this.newBackupList = {};
    //     this.groupBackupListTime();
    //     if (!this.newBackupList[strTime]) {
    //         this.newBackupList[strTime] = [];
    //     }
    //     console.log('thiss.newbackupList2222 ', this.newBackupList);
    //     this.setState({ backupList: this.newBackupList[strTime] });
    // };
    getDate = day => {
        console.log(day);
    };
    _onError = e => {
        console.log('_onError');
    };
    setBackupList = obj => {
        this.setState({ backupList: obj });
    };
    onPausePress = () => {
        let { paused } = this.state.frontVideoState;
        console.log('this_pause', paused);

        this.setState(prevState => ({
            frontVideoState: {
                // object that we want to update
                ...prevState.frontVideoState, // keep all other key-value pairs
                paused: !paused,
            },
        }));
    };

    onEnd = () => {
        let { backupList, currentIndex } = this.state;

        if (currentIndex + 1 < backupList.length) {
            this.setState(
                {
                    currentIndex: currentIndex + 1,
                },
                console.log('onEnd_onEnd_currentIndex', this.state.currentIndex)
            );
        } else {
            console.log('qwertyuioghj');
        }
        console.log('onEnd');
    };
    onStopped = () => {};

    onBuffering = e => {
        console.log('_onBuffering', e);
    };
    onPlaying = () => {
        console.log('onPlaying');
        this.setState({
            paused: !this.state.paused,
            animating: false,
        });
    };
    onError = () => {
        console.log('onError');
    };
    onLoadStart = e => {
        console.log('_onLoadStart', e);
    };

    onOpen = () => {
        console.log('_open');
    };

    onProgress = (event = {}) => {
        // if (this.tmpDuration != event.duration) {
        //     this.tmpDuration = event.duration;
        // }
        // let currentRate = (this.bufferTime + event.currentTime) / 1000; // from ms to s
        // let loadingSuccess = false;
        // if (currentRate > 0 || this.state.currentRate > 0) {
        //     loadingSuccess = true;
        // }
        // if (!this.changeSlider) {
        //     if (currentRate === 0 || currentRate === this.state.currentRate * 1000) {
        //     } else {
        //         this.setState({
        //             loadingSuccess: loadingSuccess,
        //             isLoading: false,
        //             isError: false,
        //             progress: event.position,
        //             currentTime: event.currentTime,
        //             currentRate: (currentRate * 100) / this.totalTime, //it is a rate
        //         });
        //     }
        // }
    };
    onPaused = () => {
        console.log('_onPaused');
    };
    pause = () => {
        this.setState({
            paused: !this.state.paused,
            animating: true, //to show pausing
        });
    };

    renderFrontVideo = () => {
        const { currentIndex, backupList, paused, animating } = this.state;
        console.log('renderFrontVideo_currentIndex', currentIndex);
        const { cdnUrl = '' } = backupList[currentIndex] || {};
        console.log('renderFrontVideo_currentIndex', cdnUrl);

        // let { seek } = this.state.frontVideoState || {};
        return (
            <View style={[styles.video, { backgroundColor: Colors.black }]}>
                <VlCPlayerView
                    autoplay={true}
                    url={cdnUrl}
                    Orientation={Orientation}
                    ggUrl=""
                    showGG={true}
                    onEnd={this.onEnd}
                    showTitle={false}
                    title={cdnUrl}
                    showBack={false}
                    onLeftPress={() => {}}
                    startFullScreen={() => {
                        this.setState({
                            isFull: true,
                        });
                    }}
                    closeFullScreen={() => {
                        this.setState({
                            isFull: false,
                        });
                    }}
                />
                {/*{this.renderSlider()}*/}
                {/* <Text
                    style={{
                        // position: 'absolute',
                        backgroundColor: '#fff',
                        alignSelf: 'flex-start',
                    }}
                >
                    {cdnUrl}
                </Text> */}
                {/* <ActivityIndicator
                    color={'white'}
                    style={{ position: 'absolute' }}
                    size={'large'}
                    animating={animating}
                /> */}
            </View>
        );
    };

    renderLoading() {
        return <View />;
    }
    renderCalendar = (backupList, eventList) => {
        const { showCalendar } = this.state;
        console.log(showCalendar);
        if (showCalendar) {
            return (
                <CalendarPicker
                    {...this.props}
                    backupList={backupList}
                    setBackupList={this.setBackupList}
                    data={eventList}
                    callback={this.getDate}
                />
            );
        }
    };
    render() {
        if (this.state.loading) {
            return this.renderLoading();
        }
        let { eventList, backupList, loading } = this.state;
        console.log('this.state', this.state.backupList);
        if (eventList.length > 0 || backupList.length > 0) {
            return (
                <LinearGradient
                    style={styles.container}
                    colors={[Colors.screen, Colors.screen]}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 1 }}
                >
                    <Text style={styles.title}>Playback</Text>
                    {this.renderFrontVideo()}

                    {/*<View style={{ height: 50 }} />*/}
                    {/*<Text style={styles.title}>Day picker</Text>*/}
                    <TouchableOpacity
                        style={{ height: 40, backgroundColor: Colors.white }}
                        onPress={this.onCalendarPress}
                    >
                        {/*<Image*/}
                        {/*    source={require('../../assets/ic_calendar.png')}*/}
                        {/*    style={styles.calendar}*/}
                        {/*/>*/}
                    </TouchableOpacity>

                    {this.renderCalendar(backupList, eventList)}
                </LinearGradient>
            );
        } else {
            const source = require('../../assets/empty.gif');
            if (this.state.loading) {
                return <View style={{ flex: 1 }} />;
            } else {
                return (
                    <View style={{ flex: 1, backgroundColor: Colors.white }}>
                        {/*<Image*/}
                        {/*    source={source}*/}
                        {/*    style={{ width: width - 50 }}*/}
                        {/*    resizeMode={'contain'}*/}
                        {/*/>*/}
                    </View>
                );
            }
        }
    }
}

export default function CameraVideos(props) {
    const { signOut } = React.useContext(AuthContext);
    return <CameraVideosComp {...props} signOut={signOut} />;
}
