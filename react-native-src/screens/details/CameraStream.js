import React, { Component, useState } from 'react';
import { StyleSheet, View, Text, Switch, Alert, Button, Image, Dimensions } from 'react-native';
import { Colors } from '../../utils/AppConfig';
import { HOST_URL } from '../../utils/AppConst';
import _ from 'lodash';
import { AppRoute } from '../../navigation/app-routes';
import AsyncStorage from '@react-native-community/async-storage';
import Orientation from 'react-native-orientation';
import { VlCPlayerView } from 'react-native-vlc-media-player';
import { useSafeArea } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function CameraStream(props) {
    const [camera, setCamera] = useState(_.get(props, 'camera', {}));
    const [isFull, setFull] = useState(false);
    const insets = useSafeArea();
    console.log('props', props);

    return (
        !!camera && (
            <View style={[styles.container, { paddingBottom: insets.bottom }]}>
                <View style={{ flex: 1 }}>
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
                <View
                    style={{
                        alignSelf: 'flex-end',
                        backgroundColor: 'white',
                        flexDirection: 'row',
                        width: width,
                        height: 40,
                        justifyContent: 'center',
                    }}
                >
                    {/* <Text>Switch mode</Text> */}
                </View>
            </View>
        )
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: Colors.black,
        justifyContent: 'center',
        paddingBottom: 12,
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
