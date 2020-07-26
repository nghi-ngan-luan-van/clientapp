import React, { Component, useRef, useState } from 'react';
import { StyleSheet, View, Text, Switch, Alert, Button, Image, Dimensions } from 'react-native';
import { Colors } from '../../utils/AppConfig';

import Orientation from 'react-native-orientation';
import { VlCPlayerView } from 'react-native-vlc-media-player';
import { useSafeArea } from 'react-native-safe-area-context';
import { Icon } from 'react-native-elements';

const { width } = Dimensions.get('window');

export default function CameraStream(props) {
    const propscam = props.camera || (props.route.params && props.route.params.camera);

    const [camera, setCamera] = useState(propscam, {});
    const [isFull, setFull] = useState(false);
    const insets = useSafeArea();
    const videoRef = useRef();
    const takeSnapShot = () => {
        console.log(videoRef);
    };
    return (
        !!camera && (
            <View style={[styles.container, { paddingBottom: insets.bottom }]}>
                <VlCPlayerView
                    ref={videoRef}
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

                {/*<View*/}
                {/*    style={{*/}
                {/*        alignSelf: 'flex-end',*/}
                {/*        backgroundColor: 'white',*/}
                {/*        flexDirection: 'row',*/}
                {/*        width: width,*/}
                {/*        // height: 40,*/}
                {/*        justifyContent: 'space-between',*/}
                {/*        alignItems: 'center',*/}
                {/*        padding: 12,*/}
                {/*    }}*/}
                {/*>*/}
                {/*    <Icon name={'camera'} size={50} type={'font-awesome'} onPress={takeSnapShot} />*/}
                {/*    <Text>Switch mode</Text>*/}
                {/*</View>*/}
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
});
