import React, { Component } from 'react';
import { ActivityIndicator, ScrollView, Image, StyleSheet, Text, View } from 'react-native';
import { filterVideo } from './DetailsHelper';
import { Button } from 'react-native-elements';
import data from '../../utils/sample';
import { Colors } from '../../utils/AppConfig';
import { BACK_UP_TIME } from '../../utils/AppConst';
import VLCPlayer from 'react-native-vlc-media-player/VLCPlayer';
import Slider from '../../components/slider/Slider';
import Timeline from '../../components/TimeLine/Timeline';
import moment from 'moment';
import CalendarPicker from '../../components/CalendarPicker';
import AgendaView from 'react-native-calendars/src/agenda';
import { getMovingEvents } from '../../utils/ApiUtils';
import AsyncStorage from '@react-native-community/async-storage';
const styles = StyleSheet.create({
    video: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 200,
        width: '100%',
    },
});
export default class CameraVideos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventList: [],
            video: {},
            backupList: props.events,
            cdnUrl: '',

            frontVideoState: {
                seek: 0,
                isLoading: true,
                isError: false,
                animating: true,
            },
            backVideoState: {
                seek: 0,
                isLoading: true,
                isError: false,
                animating: true,
            },
            seek: 0,

            next: true,
            isLoading: true,
            isError: false,
            loadingSuccess: false,
            currentTime: 0.0,
            currentRate: 0.0,
            totalTime: 0.0,
            // paused: false,
            animating: true,
            currentDay: '',
        };
        this.vlcRefs = [];
        this.bufferTime = 0;
        this.tmpDuration = 0;
        this.records = [];
    }

    componentDidMount = async () => {
        let { events } = this.props;
        let camera = this.props.camera;
        let userToken = await AsyncStorage.getItem('userToken');
        await getMovingEvents({ userToken, camera }, respond => {
            if (Array.isArray(respond)) {
                // console.log('eventlist', respond);
                this.setState({ eventList: respond });
            }
        });

        let filtered = filterVideo(this.state.backupList);
        this.setState(
            {
                backupList: filtered,
                video: filtered[0],
            },
            () => {
                console.log(this.state.video);
            }
        );

        let arr = [];
        let record = data.record;
        let groupArr = [];

        record.map((item, index) => {
            item.timeStart = Number(item.timeStart);

            if (index === record.length - 1) {
                item.duration = 10000;
            } else {
                let diff = Number(record[index + 1].timeStart) - Number(item.timeStart);
                let tmpDiff = moment.duration(diff, 'milliseconds');
                let hours =
                    tmpDiff && tmpDiff.hours() ? String(tmpDiff && tmpDiff.hours()) + 'h ' : '';
                let mins = String(tmpDiff && tmpDiff.minutes()) + 'm ';
                let secs = String(tmpDiff && tmpDiff.seconds()) + 's';
                item.duration = hours + mins + secs;
            }
            let time = new Date(item.timeStart);
            let date = time.getDate();
            let hour = time.getHours();
            let grIndex = groupArr.findIndex(item => item.hour === hour);
            if (grIndex !== -1) {
                groupArr[grIndex].data && groupArr[grIndex].data.push(item);
            } else {
                groupArr.push({
                    date: date,
                    hour: hour,
                    data: [item],
                });
            }
            arr.push(item);
        });
        this.records = arr;
        this.groupsRecord = groupArr;
    };
    getDate = day => {
        console.log(day);
    };
    _onError = e => {
        // [bavv add end]
        console.log('_onError');
    };

    setVideo =(obj) =>{
        this.setState({video:obj})
    }
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

    onEnded = () => {
        console.log('onEnded');
        let { video, backupList } = this.state;

        let { index = -1 } = video || {};
        if (index + 1 < backupList.length) {
            let nextVideo = backupList[index + 1];

            this.setState(prevState => ({
                video: nextVideo,
                frontVideoState: {
                    ...prevState.frontVideoState, // keep all other key-value pairs
                    animating: true,
                },
            }));
        } else {
            this.setState(prevState => ({
                frontVideoState: {
                    // object that we want to update
                    ...prevState.frontVideoState, // keep all other key-value pairs
                    animating: false,
                },
            }));
        }
    };
    onStopped = () => {
        console.log('onStopped');
    };

    onBuffering = e => {
        console.log('_onBuffering', e);
        let { paused, animating } = this.state.frontVideoState;
        // if (!animating) {
        //     this.setState(prevState => ({
        //         frontVideoState: {
        //             // object that we want to update
        //             ...prevState.frontVideoState, // keep all other key-value pairs
        //             paused: !paused,
        //         },
        //     }));
        // }
    };
    onPlaying = () => {
        console.log('onPlaying');
        this.setState(prevState => ({
            frontVideoState: {
                // object that we want to update
                ...prevState.frontVideoState, // keep all other key-value pairs
                animating: false,
            },
        }));
    };
    onError = () => {
        console.log('onError');
    };
    _onLoadStart = e => {
        console.log('_onLoadStart', e);
    };

    _onOpen = () => {
        console.log('_open');
        // this.setState({ paused: false });
    };

    onProgress = (event = {}) => {
        console.log('onProgress_', event);
    };

    onPaused = () => {
        console.log('_onPaused');
    };

    renderFrontVideo = () => {
        let { cdnUrl } = this.state.video || {};
        let { paused, seek, animating } = this.state.frontVideoState || {};

        return (
            <View style={[styles.video, { backgroundColor: Colors.white }]}>
                <VLCPlayer
                    autoplay={false}
                    ref={ref => (this.frontVideo = ref)}
                    // paused={paused}
                    seek={seek}
                    style={styles.video}
                    source={{ uri: cdnUrl }} //this.state.url
                    videoAspectRatio={'16:9'}
                    // onProgress={event => this.onProgress(event)}
                    onEnd={this.onEnded}
                    onEnded={() => {
                        console.log('lalala');
                    }}
                    onStopped={() => {
                        console.log('stop');
                        // this.frontVideo.resume();
                    }}
                    onPlaying={this.onPlaying}
                    onBuffering={this.onBuffering}
                    onPaused={this.onPaused}
                    progressUpdateInterval={250}
                    // onError={this._onError}
                    onOpen={this._onOpen}
                    onLoadStart={this._onLoadStart}
                />
                <Text
                    style={{
                        // position: 'absolute',
                        backgroundColor: '#fff',
                        alignSelf: 'flex-start',
                    }}
                >
                    {cdnUrl}
                </Text>
                {/*<ActivityIndicator*/}
                {/*    color={'red'}*/}
                {/*    style={{ position: 'absolute' }}*/}
                {/*    size={'large'}*/}
                {/*    animating={animating}*/}
                {/*/>*/}
            </View>
        );
    };

    renderVideo = video => {
        let { cdnUrl, index } = video || {};
        return (
            <View>
                {this.renderFrontVideo()}
                <Button title={this.state.paused ? 'play' : 'pause'} onPress={this.onPausePress} />
            </View>
        );
    };

    render() {
        console.log('this.state',this.state)
        let { video, eventList } = this.state;
        let tempEventList = eventList;
        let { cdnUrl } = video || {};
        // console.log('eventlist', eventList);
        if (eventList.length > 5) {
            tempEventList = tempEventList.slice(0, 4);
        }
        if (typeof cdnUrl === 'string') {
            return (
                <View style={{ paddingHorizontal: 12, flex: 1 }}>
                    {this.renderVideo()}
                    {!!(eventList.length > 0) && (
                        <CalendarPicker setVideo={this.setVideo} data={eventList} callback={this.getDate} />
                    )}
                </View>
            );
        } else {
            return <View style={{}} />;
        }
    }
}
