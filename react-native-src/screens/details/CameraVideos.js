import React, {Component} from "react";
import {ImageBackground, Platform, ScrollView, StyleSheet, View} from "react-native";
import {filterVideo} from "./DetailsHelper";
import {Button} from "react-native-elements";
import data from '../../utils/sample'
import RTSPPlayer from "../../components/VLCPlayer/RTSPPlayer";
import VLCPlayer from "react-native-vlc-media-player/VLCPlayer";
const styles = StyleSheet.create({
    video: {
        position:'relative',
        justifyContent: 'center',
        alignItems: 'center',
        height: 300,
        width: '100%',

    },
})
export default class CameraVideos extends Component {
    constructor(props) {
        super(props)
        this.state = {
            eventList: [],
            video: {},
            backupList:data.events,
            cdnUrl:'',

            next:true,
            isLoading: true,
            isError: false,
            loadingSuccess: false,
            currentTime: 0.0,
            totalTime: 0.0,
            paused: false,
        }
        this.vlcRefs = [];
        this.vlcPlayer = null;
    }

    componentDidMount() {
        let {events} = this.props;

        let filtered = filterVideo(this.state.backupList)
        console.log('sss',filtered)

        this.setState({
            backupList: filtered,
            video: filtered[0]
         },()=>{console.log(this.state.video);}
        )

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



    onPausePress=()=>{
        console.log('this_pause', this.state.paused)
        this.setState({
            paused:!this.state.paused
        })
    }



    onEnded = () =>{
        console.log('onEnded',this.state.video.index)
        // console.log('onEnd', this.vlcRefs)
        let {video, backupList} = this.state;
        if(video.index < backupList.length) {
            this.setState({
                video: this.state.backupList[video.index+1]
                // cdnUrl
            },
            console.log(this.state.video)
            )
        }
    }
    onStopped = () => {
        console.log('onStopped')
    }
    onPlaying = () => {
        console.log('onPlaying')
    }
    onError = () => {
        console.log('onError')
    }
    _onLoadStart = e => {
        console.log('_onLoadStart');
        // this.setState({
        //     paused:!this.state.paused
        // })



    }

    _onOpen=()=>{
        this.setState({paused:false})
    }

    renderVideos(list) {
        let videoAspectRatio = '16:9'

        return list.slice(0).reverse().map((item, index) => (
            <ImageBackground style={styles.video} source={require('../../assets/backgroung_cloud.png')}>
                <RTSPPlayer
                    showLoading={true}
                    autoplay={false}
                    key={index}
                    ref={ref => (this.vlcRefs.push(ref))}
                    paused={this.state.paused}
                    //seek={this.state.seek}
                    style={styles.video}
                    source={{uri: video.cdnUrl}}//this.state.url
                    videoAspectRatio={videoAspectRatio}
                    onProgress={(event)=>this.onProgress(event)}
                    // onEnd={this.onEnded.bind(this)}
                    onEnded={this.onEnded}
                    onStopped={this.onEnded}
                    onPlaying={this.onPlaying}
                    // onBuffering={this.onBuffering}
                    // onPaused={this.onPaused}
                    progressUpdateInterval={250}
                    onError={this._onError}
                    onOpen={this._onOpen}
                    onLoadStart={this._onLoadStart}
                />

                <Button title={'play'} onPress={this.onPausePress}/>
            </ImageBackground>
        ))
    }

    render() {
        let {video, eventList} = this.state;
        let tempEventList = eventList
        let {cdnUrl} = video||{};
        if (eventList.length > 5) tempEventList = tempEventList.slice(0, 4)
        if(typeof cdnUrl === 'string') return (
            <ScrollView
                contentContainerStyle={{paddingHorizontal: 12}}
            >
                <ImageBackground style={styles.video} source={require('../../assets/backgroung_cloud.png')}>
                   <VLCPlayer
                        autoplay={false}
                        // key={index}
                        ref={ref => (this.vlcRefs.push(ref))}
                        paused={this.state.paused}
                        //seek={this.state.seek}
                        style={styles.video}
                        source={{uri: cdnUrl}}//this.state.url
                        videoAspectRatio={'16:9'}
                        onProgress={(event)=>this.onProgress(event)}
                        onEnd={this.onEnded}
                        // onEnded={this.onEnded}
                        onStopped={this.onEnded}
                        onPlaying={this.onPlaying}
                        // onBuffering={this.onBuffering}
                        // onPaused={this.onPaused}
                        progressUpdateInterval={250}
                        onError={this._onError}
                        onOpen={this._onOpen}
                        onLoadStart={this._onLoadStart}
                    />

                    <Button title={'play'} onPress={this.onPausePress}/>
                </ImageBackground>

            </ScrollView>
        )
        else return <View/>
    }
}