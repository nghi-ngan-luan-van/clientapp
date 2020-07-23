import React, { useContext, useEffect, useRef, useState } from 'react';
import { Dimensions, Image, Text, View, StyleSheet, TouchableOpacity, Switch } from 'react-native';

import { Icon } from 'react-native-elements';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { Colors } from '../utils/AppConfig';
import { HOST_URL } from '../utils/AppConst';
import _ from 'lodash';
import CameraStream from '../screens/details/CameraStream';
import {
    createDrawerNavigator,
    DrawerItem,
    DrawerContentScrollView,
} from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';
import EditCamera from '../screens/editcamera';
import { getBackupVideo, getMovingEvents } from '../utils/ApiUtils';
import AsyncStorage from '@react-native-community/async-storage';
import CameraVideos from '../screens/details/CameraVideos';
import CustomTab from '../components/CustomTab';
import { AuthContext } from './AppNavigator';
const Drawer = createDrawerNavigator();
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    rightButton: {
        width: 37,
        height: 37,
    },
    label: {
        fontSize: 16,
        color: Colors.text,
    },

    containerTab: {
        flex: 1,
        // marginTop: 18,
        backgroundColor: Colors.black,
        // border
    },
});

function DrawerContent(props) {
    const { navigation } = props;
    const camera = _.get(props, 'state.routes[0].params.camera', {});
    const [isEnabled, setIsEnabled] = useState(camera.backupMode);
    const toggleSwitch = () => {
        console.log(isEnabled);
        setIsEnabled(previousState => !previousState);
        if (isEnabled) {
            onSwitchDetectMode();
        } else {
            onSwitchRecordMode();
        }
    };
    const onSwitchDetectMode = async () => {
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

        fetch(HOST_URL + 'camera/turndetect', requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result);
                let { navigation } = props;
                navigation && navigation.navigate('Camera');
            });
    };

    const onSwitchRecordMode = async () => {
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

        fetch(HOST_URL + 'camera/recorddetect', requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result);
                let { navigation } = props;
                navigation && navigation.navigate('Camera');
            });
    };
    return (
        <DrawerContentScrollView contentContainerStyle={{ paddingHorizontal: 12 }}>
            <DrawerItem
                // focused
                icon={() => (
                    <Icon
                        // style={{width:36,height:36}}
                        name="camera"
                        color="#7b79db"
                        type="font-awesome"
                    />
                )}
                label={camera.name}
                labelStyle={styles.label}
                onPress={() => navigation && navigation.navigate && navigation.navigate('Camera')}
            />
            <DrawerItem
                icon={() => (
                    <Image
                        style={{ width: 30, height: 30 }}
                        source={require('../assets/ic_edit.png')}
                    />
                )}
                label="Chỉnh sửa thông tin camera"
                labelStyle={styles.label}
                onPress={() => {
                    navigation && navigation.navigate && navigation.navigate('Edit');
                }}
            />
            <DrawerItem
                icon={() => <Switch onValueChange={toggleSwitch} value={isEnabled} />}
                label="Chế độ backup"
                labelStyle={styles.label}
            />
        </DrawerContentScrollView>
    );
}

const CameraTabs = props => {
    const params = _.get(props, 'route.params.params');
    let { navigation } = props;
    const [events, setEvents] = useState([]);
    const { signOut } = useContext(AuthContext);

    useEffect(() => {
        const { camera } = params;
        const onPressSetting = () => {
            navigation && navigation.dispatch(DrawerActions.toggleDrawer());
        };

        navigation &&
            navigation.setOptions({
                headerRight: () => (
                    <TouchableOpacity onPress={onPressSetting}>
                        <Image
                            source={require('../assets/ic_settings.png')}
                            style={styles.rightButton}
                        />
                    </TouchableOpacity>
                ),
            });
        // const getVideo = async callback => {
        //     let userToken = await AsyncStorage.getItem('userToken');
        //     getBackupVideo({ userToken, camera }, callback);
        // };

        // getVideo(res => {
        //     if (Array.isArray(res)) {
        //         setEvents(res);
        //     } else {
        //         if (!res) {
        //             signOut();
        //         }
        //     }
        // });
    }, []);

    // const detailScreens = () => (
    //     <ScrollableTabView locked>
    //         <CameraStream tabLabel="Stream" {...params} />
    //         <CameraVideos tabLabel="Media" events={events} />
    //     </ScrollableTabView>
    // );

    return (
        <Drawer.Navigator
            initialRouteName={'Camera'}
            drawerPosition={'right'}
            drawerType={'front'}
            drawerContent={props => <DrawerContent {...props} />}
        >
            <Drawer.Screen
                name={'Camera'}
                component={Detail}
                initialParams={params}
            />
            <Drawer.Screen name={'Edit'} component={EditCamera} initialParams={params} />
        </Drawer.Navigator>
    );
};

const Detail = ({ events, params, ...props }) => (
    <ScrollableTabView
        tabBarBackgroundColor={Colors.white}
        tabBarActiveTextColor={Colors.violet}
        initialPage={0}
        locked={true}
        contentProps={{
            keyboardShouldPersistTaps: 'always',
        }}
    >
        <CameraStream tabLabel="Camera trực tiếp" {...params} {...props} />
        <CameraVideos
            tabLabel="Thư viện "
            camera={params && params.camera}
            {...props}
        />
    </ScrollableTabView>
);
module.exports = CameraTabs;
