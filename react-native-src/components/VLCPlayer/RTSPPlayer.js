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


export default class RTSPPlayer extends React.Component {
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
        };
        this.touchTime = 0;
        this.viewingTime = 0;
        this.initSuccess = false;
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
            volume,
            muted,
            videoAspectRatio,
            mediaOptions,
            initOptions,
            initType,
            autoplay,
            isFull
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
                    {/*<VLCPlayer*/}
                    {/*    hwDecoderEnabled={this.props.hwDecoderEnabled}*/}
                    {/*    hwDecoderForced={this.props.hwDecoderForced}*/}
                    {/*    autoAspectRatio={this.props.autoAspectRatio}*/}
                    {/*    showLog={this.props.showLog}*/}
                    {/*    ref={ref => (this.vlcPlayer = ref)}*/}
                    {/*    style={styles.video}*/}
                    {/*    autoplay={autoplay}*/}
                    {/*    source={source}*/}
                    {/*    volume={this.state.volume}*/}
                    {/*    muted={this.state.muted}*/}
                    {/*    videoAspectRatio={videoAspectRatio}*/}
                    {/*    onProgress={this._onProgress}*/}
                    {/*    onEnd={this._onEnded}*/}
                    {/*    onStopped={this._onStopped}*/}
                    {/*    onPlaying={this._onPlaying}*/}
                    {/*    onBuffering={this._onBuffering}*/}
                    {/*    onPaused={this.onPaused}*/}
                    {/*    onError={this._onError}*/}
                    {/*    onOpen={this._onOpen}*/}
                    {/*    onLoadStart={this._onLoadStart}*/}
                    {/*    onSnapshot={this._onSnapshot}*/}
                    {/*    onIsPlaying={this._onIsPlaying}*/}
                    {/*    mediaOptions={mediaOptions ||*/}
                    {/*    {*/}
                    {/*        ':network-caching': 250,*/}
                    {/*        ':live-caching': 250,*/}
                    {/*    }*/}
                    {/*    }*/}
                    {/*    initOptions={initOptions || []}*/}
                    {/*    initType={initType || 1}*/}
                    {/*/>*/}
                </View>
                {this._renderLoading()}
            </View>
        );
    }

}