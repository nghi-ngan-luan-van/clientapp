import React, { Component, useState } from 'react';
import { StyleSheet, View, Text, Switch, Alert, Button, Image } from 'react-native';
import { Colors } from '../../utils/AppConfig';
import { HOST_URL } from '../../utils/AppConst';
import _ from 'lodash';
import { AppRoute } from '../../navigation/app-routes';
import AsyncStorage from '@react-native-community/async-storage';
import Orientation from 'react-native-orientation';
import { VlCPlayerView } from 'react-native-vlc-media-player';

export default function CameraStream(props) {
    const [camera, setCamera] = useState(_.get(props, 'camera', {}));
    const [isFull, setFull] = useState(false);
    console.log('props', props);

    return (
        !!camera && (
            <View style={styles.container}>
                <VlCPlayerView
                    autoplay={false}
                    url={camera.rtspUrl}
                    Orientation={Orientation}
                    showGG={false}
                    showTitle={true}
                    title={camera.name}
                    showBack={false}
                    onLeftPress={() => {}}
                    startFullScreen={() => setFull(true)}
                    closeFullScreen={() => setFull(false)}
                />
            </View>
        )
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: Colors.black,
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
});
