import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Input} from 'react-native-elements';
import _ from 'lodash';
import AsyncStorage from '@react-native-community/async-storage';
import {AppRoute} from '../../navigation/app-routes';
import {Colors} from '../../utils/AppConfig'

export default function EditCamera(props) {
    const [camera, setCamera] = useState(_.get(props, 'route.params.camera', {}));
    const [isEnabled, setIsEnabled] = useState(camera.backupMode);
    const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
    const [newName, setNewName] = useState(camera.name);
    const [newIP, setNewIP] = useState(camera.ip);
    const [newPort, setNewPort] = useState(camera.port);

    const onUpdateCamera = async () => {
        console.log(newName, newIP, newPort, isEnabled);
        const token = await AsyncStorage.getItem('userToken');
        if (typeof newPort !== 'number') {
            console.log(typeof newPort);
            alert('Port must be a number');
            return;
        }
        let myHeaders = new Headers();
        myHeaders.append('Authorization', `Bearer ${token}`);
        myHeaders.append('Content-Type', 'application/json');

        let raw = JSON.stringify({
            _id: camera._id,
            name: newName,
            rtspUrl: camera.rtspUrl,
            ip: newIP,
            port: newPort,
            backupMode: isEnabled,
        });

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };

        fetch('http://165.22.98.234/camera/edit', requestOptions)
            .then((response) => response.text())
            .then((result) => {
                console.log(result);
                let {navigation} = props;
                navigation && navigation.push(AppRoute.HOME, {});
            });
    };
    const onJumpToMode = () => {
        const {navigation} = props;
        navigation &&
        navigation.navigate(AppRoute.CAMERA_EDIT_MODE, {
            camera: camera,
        });
    };
    return (
        <View style={styles.container}>
            <Input
                inputContainerStyle={styles.input}
                label="Camera Name"
                rightIcon={{type: 'antdesign', name: 'edit'}}
                leftIconContainerStyle={{margin: 10}}
                defaultValue={camera.name}
                onChangeText={(value) => {
                    setNewName(value);
                }}
            />

            <Input
                disabled
                inputContainerStyle={styles.input}
                label="RTSP Url"
                rightIcon={{type: 'antdesign', name: 'location-arrow'}}
                style={{height: '36'}}
                defaultValue={camera.rtspUrl}
            />
            <Input
                inputContainerStyle={styles.input}
                label="IP"
                rightIcon={{type: 'antdesign', name: 'edit'}}
                style={{height: '36'}}
                defaultValue={camera.ip}
                onChangeText={(value) => {
                    setNewIP(value);
                }}
            />

            <Input
                inputContainerStyle={styles.input}
                label="Port"
                keyboardType="numeric"
                rightIcon={{type: 'antdesign', name: 'edit'}}
                maxLength={10}
                style={{height: '36'}}
                defaultValue={camera && camera.port && camera.port.toString()}
                onChangeText={(value) => {
                    setNewPort(Number.parseInt(value));
                }}
            />

            <Button
                type={'solid'}
                title={'Save Camera Information'}
                titleStyle={styles.title}
                // style={styles.btn}
                onPress={onUpdateCamera}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 12,
        backgroundColor: '#fff'
    },
    btn: {
        padding: 10
    },
    title: {
        fontWeight: 'bold'
    },
    switchBtn: {
        paddingBottom: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    input: {
        padding: 5,
        backgroundColor: Colors.screen,
        borderBottomWidth: 0,
        borderRadius: 8,
    }
});
