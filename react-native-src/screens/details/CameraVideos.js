import React, { Component } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';
import { filterVideo } from './DetailsHelper';
import { Button } from 'react-native-elements';
import data from '../../utils/sample';
import { Colors } from '../../utils/AppConfig';
import { BACK_UP_TIME } from '../../utils/AppConst';
import VLCPlayer from 'react-native-vlc-media-player/VLCPlayer';
import Slider from '../../components/slider/Slider';
import Timeline from '../../components/TimeLine/Timeline';
import moment from 'moment';
const styles = StyleSheet.create({
    video: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        height: 300,
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
        };
        this.vlcRefs = [];
        this.vlcPlayer = null;
        // this.totalTime = 0;
        this.bufferTime = 0;
        this.tmpDuration = 0;
        this.changeSlide = false;
        this.records = [];
    }

    componentDidMount() {
        let { events } = this.props;
        // console.log('componentDidMount', events);
        let filtered = filterVideo(this.state.backupList);
        this.setState(
            {
                backupList: filtered,
                video: filtered[0],
            },
            () => {
                this.totalTime = this.state.backupList.length * BACK_UP_TIME;
                console.log(this.state.video);
            }
        );

        let tmpTimeStart;
        let arr = [];
        let record = data.record;
        let groupArr = [];

        record.map((item, index) => {
            item.timeStart = Number(item.timeStart);

            if (index === record.length - 1) {
                item.duration = 10000;
            } else {
                // let start = moment(Number(record[index + 1].timeStart)); // some random moment in time (in ms)
                // let end = moment(Number(item.timeStart)); // some random moment after start (in ms)
                // let diff = end.diff(start);

                // item.duration = moment.utc(diff).format('HH:mm:ss.SSS');
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
    }

    _onError = e => {
        // [bavv add end]
        console.log('_onError');
        console.log(e);
        this.reloadSuccess = false;
        this.setState({
            isError: true,
        });
    };

    onPausePress = () => {
        console.log('this_pause', this.state.paused);
        this.setState({
            paused: !this.state.paused,
        });
    };

    onEnded = () => {
        let { video, backupList } = this.state;

        this.bufferTime = this.bufferTime + this.tmpDuration;
        // console.log()
        if (video.index < backupList.length - 1) {
            this.setState({
                video: this.state.backupList[video.index + 1],
                animating: true,
            });
        }
    };
    onStopped = () => {
        console.log('onStopped');
    };
    onPlaying = () => {
        console.log('onPlaying');
        this.setState({
            // paused:!this.state.paused
            animating: false,
        });
    };
    onError = () => {
        console.log('onError');
    };
    _onLoadStart = e => {
        console.log('_onLoadStart', e);
    };

    _onOpen = () => {
        this.setState({ paused: false });
    };

    onProgress = (event = {}) => {
        // console.log('onProgress_', event)
        /* console.log(
    'position=' +
    event.position +
    ',currentTime=' +
    event.currentTime +
    ',remainingTime=' +
    event.remainingTime,
    );*/
        //      currentTime: 154
        // duration: 8108
        // position: 0.018963739275932312
        // remainingTime: -7966
        // target: 5323
        // if( this.tmpDuration!= event.duration ){
        //     this.tmpDuration = event.duration
        // }
        // let currentRate = (this.bufferTime + event.currentTime) / 1000;// from ms to s
        // let loadingSuccess = false;
        // if (currentRate > 0 || this.state.currentRate > 0) {
        //     loadingSuccess = true;
        // }
        // // console.log(this.totalTime)
        // // console.log(this.bufferTime)
        // // console.log(currentTime)
        // if (!this.changeSlider) {
        //     if (currentRate === 0 || currentRate === this.state.currentRate * 1000) {
        //     } else {
        //         this.setState({
        //             loadingSuccess: loadingSuccess,
        //             isLoading: false,
        //             isError: false,
        //             progress: event.position,
        //             currentTime: event.currentTime,
        //             currentRate: (currentRate * 100 )/this.totalTime,//it is a rate
        //         });
        //     }
        // }
    };
    onBuffering = () => {};
    onPaused = () => {};

    onValueChange = values => {
        this.changeSlider = true;
        // this.vlcRefs
        // console.log(value)
        // let value = values[0];
        // let {index = 0} = this.state.video || {}
        // // let estTime =  value /100 * this.totalTime;
        // // let msEstTime = estTime * 1000;
        // let seekTime =0;
        // let {currentRate, currentTime, backupList} = this.state;
        // let diff = value - currentRate;
        // if(diff < 0){
        //     //move back
        //     seekTime = - diff *10000* this.totalTime;//to ms
        //
        //     //if same video
        //     if(seekTime < currentTime){
        //         this.vlcPlayer&& this.vlcPlayer.seek && this.vlcPlayer.seek(seekTime);
        //         this.setState({seek:seekTime + (diff * 1000)})
        //     }
        //     // if not same video
        //     else{
        //         //check can seek
        //         if(index === 0){
        //             this.vlcPlayer&& this.vlcPlayer.seek && this.vlcPlayer.seek(0);
        //             this.setState({seek:0})
        //         }
        //         else{
        //             this.setState({
        //                 video:this.state.backupList[index-1]
        //             },()=>{
        //                 this.vlcPlayer&& this.vlcPlayer.seek && this.vlcPlayer.seek(0);
        //             })
        //         }
        //     }
        // }else{
        //     seekTime = diff *10000* this.totalTime;//to ms
        //
        //     //if same video
        //     if(seekTime + currentTime < this.tmpDuration){
        //         this.vlcPlayer&& this.vlcPlayer.seek && this.vlcPlayer.seek(seekTime);
        //         this.setState({seek:(currentTime + diff )* 1000})
        //     }
        //     // if not same video
        //     else{
        //         //check can seek
        //         if(index === (backupList.length-1)){//cant seek
        //             this.vlcPlayer.seek && this.vlcPlayer.seek(1);
        //             this.setState({seek:1})
        //         }
        //         else{
        //             // this.setState({
        //             //     video:this.state.backupList[index+1]
        //             // },()=>{
        //                 // console.log('this.vlcPlayer&& this.vlcPlayer && this.vlcPlayer.resume();\n',this.vlcPlayer)
        //                 // this.vlcPlayer&& this.vlcPlayer && this.vlcPlayer.resume();
        //                 //
        //                 // this.vlcPlayer&& this.vlcPlayer.seek && this.vlcPlayer.seek(seekTime-(this.tmpDuration-currentTime));
        //                 // // this.setState({seek: seekTime-(this.tmpDuration-currentTime)/1000})
        //
        //             // }
        //         // )
        //         }
        //     }
        // }
        // // this.vlcPlayer&& this.vlcPlayer.seek && this.vlcPlayer.seek(value*10);
        // // this.setState({
        // //     currentRate: 0
        // // },this.setState({
        // //     currentRate: value
        // // }))
    };
    onChangeFinish = values => {
        this.changeSlider = false;
        let value = values[0];

        let { currentRate } = this.state;
        let diff = value - currentRate;
        this.setState({
            currentRate: value,
            seek: (diff * this.tmpDuration) / 100 / this.totalTime,
        });
    };

    renderSlider() {
        let { currentRate } = this.state;
        return (
            <Slider
                min={0}
                max={12 * 3600 * 1000}
                values={[currentRate]}
                onChange={this.onValueChange}
                onChangeFinish={this.onChangeFinish}
            />
        );
    }

    renderControls() {}
    renderBackgroundVideo = () => {
        return this.renderVideo();
    };

    renderVideo = video => {
        let { cdnUrl } = video || {};
        return (
            <View>
                <View style={[styles.video, { backgroundColor: Colors.black }]}>
                    <VLCPlayer
                        autoplay={false}
                        ref={ref => (this.vlcPlayer = ref)}
                        paused={this.state.paused}
                        seek={this.state.seek}
                        style={styles.video}
                        source={{ uri: cdnUrl }} //this.state.url
                        videoAspectRatio={'16:9'}
                        onProgress={event => this.onProgress(event)}
                        onEnd={this.onEnded}
                        // onEnded={this.onEnded}
                        onStopped={this.onEnded}
                        onPlaying={this.onPlaying}
                        onBuffering={this.onBuffering}
                        onPaused={this.onPaused}
                        progressUpdateInterval={250}
                        onError={this._onError}
                        onOpen={this._onOpen}
                        onLoadStart={this._onLoadStart}
                    />
                    <ActivityIndicator
                        style={{ position: 'absolute' }}
                        size={'large'}
                        animating={this.state.animating}
                    />
                </View>
                <Button title={this.state.paused ? 'play' : 'pause'} onPress={this.onPausePress} />
                {this.renderSlider()}
            </View>
        );
    };
    renderTimeline = () => {
        // console.log('recordrecord', data.record);

        return <Timeline data={this.groupsRecord} />;
    };

    render() {
        let { video, eventList } = this.state;
        let tempEventList = eventList;
        let { cdnUrl } = video || {};
        if (eventList.length > 5) {
            tempEventList = tempEventList.slice(0, 4);
        }
        // if (typeof cdnUrl === 'string') {
        //     return (
        //         <ScrollView contentContainerStyle={{ paddingHorizontal: 12 }}>
        //             {/*{this.renderVideo(video)}*/}
        //             {this.renderTimeline}
        //         </ScrollView>
        //     );
        // } else {
        return <View style={{}}>{this.renderTimeline()}</View>;
        // }
    }
}
