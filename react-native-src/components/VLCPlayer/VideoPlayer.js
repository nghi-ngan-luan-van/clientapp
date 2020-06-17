import React from "react";
import {ActivityIndicator, View, StyleSheet} from "react-native";
import {VLCPlayer} from "react-native-vlc-media-player";

const styles = StyleSheet.create({
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
})


export default class VideoPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            paused: true,
            showLoading: true,
            loadingSuccess: false,
            isFull: false,
            currentTime: 0,
            totalTime: 0,
            showControls: false,
            seek: 0,
            volume: 200,
            muted: false,
            isError: false,
            next:true,
            isLoading: true,

        };
        this.touchTime = 0;
        this.viewingTime = 0;
        this.initSuccess = false;
    }

    _onError = e => {

    };

    onProgress(event) {

    }



    onPausePress=()=>{

    }



    onEnded = () =>{

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

    _renderLoading = ()=>{
        // let { showAd, isEndAd, isAd, pauseByAutoplay} = this.props;
        // let { showLoading, showAdLoading } = this.state;
        // if(!pauseByAutoplay && showLoading){
            return(
                <View style={styles.loading}>
                    <ActivityIndicator size={'large'} animating={true} color="#fff" />
                </View>
            )
        // }
        // return null;
    }


    render() {
        let {
            onEnd,
            style,
            isAd,
            url,

        } = this.props;

        let { width, height} = this.state;

        let source = {};
        if (url) {
            if (url.split) {
                source = { uri: url };
            } else {
                source = url;
            }
        }


        return (
            <View style={[{flex:1},style]}>
                <View style={{flex:1}} onLayout={this.onLayout}>
                    <VLCPlayer
                        autoplay={false}
                        // key={index}
                        ref={ref => (this.vlcRefs.push(ref))}
                        paused={this.state.paused}
                        //seek={this.state.seek}
                        style={styles.video}
                        source={{uri: url}}//this.state.url
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
                </View>
                {this._renderLoading()}
            </View>
        );
    }

}