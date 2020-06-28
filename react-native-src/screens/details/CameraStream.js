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
    const [camera, setCamera] = useState(_.get(props, 'route.params.camera', {}));

    const renderAlertDelete = () => {
        return Alert.alert(
            'Warning',
            'Do you want to permanently delete this camera ?',
            [
                {
                    text: 'OK',
                    onPress: async () => {
                        const token = await AsyncStorage.getItem('userToken');
                        let myHeaders = new Headers();
                        myHeaders.append('Authorization', `Bearer ${token}`);
                        myHeaders.append('Content-Type', 'application/json');

                        let raw = JSON.stringify({ _id: camera._id });

                        let requestOptions = {
                            method: 'POST',
                            headers: myHeaders,
                            body: raw,
                            redirect: 'follow',
                        };

                        fetch(HOST_URL + 'camera/delete', requestOptions)
                            .then(response => response.text())
                            .then(result => {
                                let { navigation } = props;
                                navigation && navigation.push(AppRoute.HOME, {});
                            });
                    },
                },
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
            ],
            { cancelable: false }
        );
    };

    return (
        !!camera && (
            <View style={styles.container}>
                <VlCPlayerView
                    autoplay={false}
                    url={camera.rtspUrl}
                    Orientation={Orientation}
                    // ggUrl={'https://clientapp.sgp1.digitaloceanspaces.com/5e9471d6cbeb62504f03bc0b/5ed3e22848d6943ed70ec47f/1591588229691.mp4'}
                    showGG={false}
                    showTitle={true}
                    title={camera.name}
                    showBack={true}
                    onLeftPress={() => {}}
                    startFullScreen={() => {
                        this.setState({
                            isFull: true,
                        });
                    }}
                    closeFullScreen={() => {
                        this.setState({
                            isFull: false,
                        });
                    }}
                />
            </View>
        )
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.black,
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
