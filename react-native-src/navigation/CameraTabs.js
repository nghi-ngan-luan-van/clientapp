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
import AsyncStorage from '@react-native-community/async-storage';
import CameraVideos from '../screens/details/CameraVideos';
import CustomTab from '../components/CustomTab';
import LinearGradient from 'react-native-linear-gradient';
import { turnDetect } from '../utils/ApiUtils';
import { AppRoute } from './app-routes';
const Drawer = createDrawerNavigator();
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    rightIcon: {
        alignSelf: 'center',
        width: 26,
        height: 26,
    },
    label: {
        flex: 1,
        marginLeft: 12,
        // backgroundColor: 'red',
        alignSelf: 'flex-start',
        fontSize: 16,
        color: Colors.text,
    },
    icon: {
        backgroundColor: Colors.whisper,
        padding: 5,
        borderRadius: 18,
        marginRight: 12,
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
    const onSwitch = result => {
        console.log(result);
        if (result) {
            navigation && navigation.navigate(AppRoute.CAMERA);
        }
    };
    const onSwitchDetectMode = async () => {
        const token = await AsyncStorage.getItem('userToken');
        const headers = 'Authorization' + `Bearer ${token}`;
        const data = { _id: camera._id };
        try {
            await turnDetect({ data, headers }, onSwitch);
        } catch (e) {
            console.log(e);
        }
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
        <LinearGradient
            style={{ flex: 1 }}
            colors={[Colors.pigeon_post, Colors.whisper]}
            start={{ x: 1, y: 1 }}
            end={{ x: 0, y: 0 }}
        >
            <DrawerContentScrollView contentContainerStyle={{ paddingHorizontal: 12 }}>
                <DrawerItem
                    // focused
                    icon={() => (
                        <Icon
                            // style={{width:36,height:36}}
                            name="camera"
                            color="#7b79db"
                            type="font-awesome"
                            style={styles.rightIcon}
                        />
                    )}
                    // style={{ backgroundColor: 'red', alignItems: 'flex-start' }}
                    label={camera.name}
                    labelStyle={styles.label}
                    onPress={() =>
                        navigation && navigation.navigate && navigation.navigate('Camera')
                    }
                />
                <DrawerItem
                    icon={() => (
                        <Image
                            // style={{ width: 30, height: 30 }}
                            source={require('../assets/ic_edit.png')}
                            style={styles.rightIcon}
                        />
                    )}
                    label="Chỉnh sửa thông tin camera"
                    labelStyle={styles.label}
                    onPress={() => {
                        navigation && navigation.navigate && navigation.navigate('Edit');
                    }}
                />
                <DrawerItem
                    icon={() => (
                        <Switch
                            // style={{ width:  }}
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />
                    )}
                    label="Chế độ backup"
                    labelStyle={[styles.label, { marginLeft: -12 }]}
                />
            </DrawerContentScrollView>
        </LinearGradient>
    );
}

const CameraTabs = props => {
    const params = _.get(props, 'route.params.params');
    let { navigation } = props;
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const { camera } = params;
        const onPressSetting = () => {
            navigation && navigation.dispatch(DrawerActions.toggleDrawer());
        };

        navigation &&
            navigation.setOptions({
                headerRight: () => (
                    <TouchableOpacity onPress={onPressSetting} style={styles.icon}>
                        <Image
                            source={require('../assets/ic_settings.png')}
                            style={styles.rightIcon}
                        />
                    </TouchableOpacity>
                ),
            });
    }, []);

    return (
        <Drawer.Navigator
            initialRouteName={'Camera'}
            drawerPosition={'right'}
            drawerType={'float'}
            drawerContent={props => <DrawerContent {...props} />}
        >
            <Drawer.Screen name={'Camera'} component={Detail} initialParams={params} />
            <Drawer.Screen name={'Edit'} component={EditCamera} initialParams={params} />
        </Drawer.Navigator>
    );
};

const Detail = ({ events, params, ...props }) => (
    <ScrollableTabView
        renderTabBar={() => <CustomTab />}
        tabBarBackgroundColor={Colors.white}
        tabBarActiveTextColor={Colors.violet}
        initialPage={0}
        locked={true}
        contentProps={{
            keyboardShouldPersistTaps: 'always',
        }}
    >
        <CameraStream tabLabel="Camera trực tiếp" {...params} {...props} />
        <CameraVideos tabLabel="Thư viện " camera={params && params.camera} {...props} />
    </ScrollableTabView>
);
module.exports = CameraTabs;
