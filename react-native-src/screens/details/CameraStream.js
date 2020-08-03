import React, { Component, useRef, useState } from 'react';
import { StyleSheet, View, Text, Switch, Alert, Button, Image, Dimensions } from 'react-native';
import { Colors } from '../../utils/AppConfig';
import VLCPlayerView from '../../components/VLCPlayer/VLCPlayerView';
import Orientation from 'react-native-orientation';
// import { VlCPlayerView } from 'react-native-vlc-media-player';
import { useSafeArea } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const testlink = 'http://10.200.62.20:8080/playlist.m3u';

export default function CameraStream(props) {
    const propscam = props.camera || (props.route.params && props.route.params.camera);

    const [camera, setCamera] = useState(propscam, {});
    const [isFull, setFull] = useState(false);
    const [canPlay, setPlay] = useState(false);
    const insets = useSafeArea();
    const videoRef = useRef();
    const takeSnapShot = () => {
        console.log(videoRef);
    };

    return (
        !!camera && (
            <View style={[styles.container, { paddingBottom: insets.bottom }]}>
                <VLCPlayerView
                    ref={videoRef}
                    autoplay={false}
                    // url={testlink}
                    url={camera.rtspUrl}
                    Orientation={Orientation}
                    showGG={false}
                    showTitle={false}
                    title={camera.name}
                    showBack={false}
                    onLeftPress={() => {}}
                    startFullScreen={() => setFull(true)}
                    closeFullScreen={() => setFull(false)}
                />
                {!!canPlay && (
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>LIVE</Text>
                    </View>
                )}
            </View>
        )
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        // justifyContent: 'center',
        paddingBottom: 12,
        // alignContent: 'center',
    },
    selectMenu: {
        height: 50,
        width: '70%',
    },
    options: {
        right: 20,
        top: 20,
    },
    iconSetting: {
        // padding: 15,
    },
    rightButton: {
        width: 37,
        height: 37,
    },
    top: {
        backgroundColor: 'white',
        flexDirection: 'row',
        flexWrap: 'wrap',
        top: 0,
        height: 40,
        right: 0,
        left: 0,
        position: 'relative',
    },
    video: {
        backgroundColor: Colors.black,
        height: '70%',
        width: '100%',
    },
    body: {
        backgroundColor: Colors.white,
    },
    badge: {
        backgroundColor: Colors.red,
        borderRadius: 16,
        padding: 8,
    },
    badgeText: {
        color: Colors.white,
    },
});
