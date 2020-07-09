import React, { Component } from 'react';
import { View } from 'react-native';
import CalendarPicker from '../../components/CalendarPicker';
import { getMovingEvents } from '../../utils/ApiUtils';
import AsyncStorage from '@react-native-community/async-storage';
import CustomVideoView from './CustomVideoView';
import moment from 'moment';
export default class CameraVideos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventList: [],
            video: {},
            backupList: [],

            currentIndex: 0,
            frontVideoState: {
                seek: 0,
                isLoading: true,
                isError: false,
                animating: true,
                paused: false,
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
            paused: false,
            animating: true,
            currentDay: '',
        };
        this.bufferTime = 0;
        this.tmpDuration = 0;
        this.records = [];
        this.newData = {};
        this.newBackupList = {};
    }

    componentDidMount = async () => {
        let camera = this.props.camera;
        let userToken = await AsyncStorage.getItem('userToken');
        getMovingEvents({ userToken, camera }, respond => {
            if (Array.isArray(respond)) {
                this.setState({ eventList: respond });
            }
        });
        this.loadItems();
    };

    componentWillUnmount() {}

    timeToString = time => {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
    };
    groupBackupListTime = () => {
        let { events = [] } = this.props;
        events.forEach((value, index, arr) => {
            const date = moment(Number(value.timeStart)).startOf('day');
            const strDate = this.timeToString(date);
            if (!this.newBackupList[strDate]) {
                this.newBackupList[strDate] = [];
            }
            this.newBackupList[strDate].push(value);
        });
    };
    loadItems = () => {
        const time = Date.now();
        const strTime = this.timeToString(time);
        console.log('time', time, 'strTime', strTime);
        this.newBackupList = {};
        this.groupBackupListTime();
        if (!this.newBackupList[strTime]) {
            this.newBackupList[strTime] = [];
        }
        console.log('thiss.newbackupList ', this.newBackupList);
        this.setState({ backupList: this.newBackupList[strTime] });
    };
    getDate = day => {
        console.log(day);
    };
    _onError = e => {
        console.log('_onError');
    };

    setBackupList = obj => {
        this.setState({ backupList: obj });
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

    renderFrontVideo = () => {
        let { currentIndex, backupList } = this.state;
        console.log('renderFrontVideo_currentIndex', currentIndex);
        let { cdnUrl = '' } = backupList[currentIndex] || {};
        console.log('renderFrontVideo_currentIndex', cdnUrl);

        // let { seek } = this.state.frontVideoState || {};
        return (
            <CustomVideoView
                cdnUrl={cdnUrl}
                // seek={seek}
                onEnd={this.onEnd}
                onProgress={e => this.onProgress(e)}
                onStopped={this.onStopped}
            />
        );
    };

    render() {
        let { eventList } = this.state;
        console.log('this.state', this.state);
        return (
            <View style={{ flex: 1 }}>
                {this.renderFrontVideo()}

                <View style={{ height: 50 }} />
                {!!(eventList.length > 0) && (
                    <CalendarPicker
                        {...this.props}
                        backupList={this.props.events}
                        setBackupList={this.setBackupList}
                        data={eventList}
                        callback={this.getDate}
                    />
                )}
            </View>
        );
    }
}
