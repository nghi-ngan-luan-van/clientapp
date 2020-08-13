import React from 'react';
import VLCPlayerView from './VLCPlayerView';
import ControlBtn from './ControlBtn';
import { Platform } from 'react-native';
export default class VLCVideoMp4 extends VLCPlayerView {
    constructor(props) {
        super(props);
        this.state = {
            isFull: false,
            paused: false,
            currentTime: 0,
        };
    }
    onEnd = () => {};
    onLeftPress = () => {};
    _play = () => {
        this.setState({
            paused: !this.state.paused,
        });
    };
    _toFullScreen = () => {
        this.setState({
            isFull: !this.state.isFull,
        });
    };
    renderControlBar = () => {
        let { isFull, paused, currentTime } = this.state;
        return (
            <ControlBtn
                // showSlider={!isGG}
                // showGG={showGG}
                onEnd={this.onEnd}
                onLeftPress={this.onLeftPress}
                paused={paused}
                isFull={isFull}
                currentTime={currentTime}
                totalTime={this.state.totalTime}
                onPausedPress={this._play}
                onFullPress={this._toFullScreen}
                onValueChange={value => {
                    this.changingSlider = true;
                    this.setState({
                        currentTime: value,
                    });
                }}
                onSlidingComplete={value => {
                    this.changingSlider = false;
                    if (Platform.OS === 'ios') {
                        this.vlcPlayer.seek(Number((value / this.state.totalTime).toFixed(17)));
                    } else {
                        this.vlcPlayer.seek(value);
                    }
                }}
                // onReplayPress={onReplayPress}
                // titleGolive={titleGolive}
                // showLeftButton={showLeftButton}
                // showMiddleButton={showMiddleButton}
                // showRightButton={showRightButton}
            />
        );
    };
}
