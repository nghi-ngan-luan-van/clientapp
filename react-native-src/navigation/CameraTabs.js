import React, { useLayoutEffect, useEffect, useRef, useState } from 'react';
import { Dimensions, Image, Text, View, StyleSheet, TouchableOpacity, Switch } from 'react-native';

import { Icon } from 'react-native-elements';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { Colors } from '../utils/AppConfig';
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
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

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
                label="Edit camera infor"
                labelStyle={styles.label}
                onPress={() => {
                    navigation && navigation.navigate && navigation.navigate('Edit');
                }}
            />
            <DrawerItem
                icon={() => <Switch onValueChange={toggleSwitch} value={isEnabled} />}
                label="Change backup mode"
                labelStyle={styles.label}
            />
        </DrawerContentScrollView>
    );
}

const CameraTabs = props => {
    const params = _.get(props, 'route.params.params');
    let { navigation } = props;
    const [events, setEvents] = useState([]);
    useEffect(() => {
        const { camera } = params;
        const getVideo = async callback => {
            let userToken = await AsyncStorage.getItem('userToken');
            getBackupVideo({ userToken, camera }, callback);
        };

        getVideo(res => {
            if (Array.isArray(res)) {
                setEvents(res);
            }
        });
    }, []);
    console.log('this is event in tabs', events);
    if (events && events.length > 0) {
        return <Detail events={events} params={params} navigation={navigation} />;
    } else {
        return <CameraStream {...params} navigation={navigation} />;
    }
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
        <CameraVideos tabLabel="Thư viện " events={events} camera={params.camera} {...props} />
    </ScrollableTabView>
);
module.exports = CameraTabs;
