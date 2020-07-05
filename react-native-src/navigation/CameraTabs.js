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
    const { navigation } = props;
    const params = _.get(props, 'route.params.params');
    const settingRef = useRef();
    const [events, setEvents] = useState([]);
    useEffect(() => {
        const onPressSetting = () => {
            navigation && navigation.dispatch(DrawerActions.toggleDrawer());
        };
        const { camera } = params;
        const getVideo = async callback => {
            let userToken = await AsyncStorage.getItem('userToken');
            await getBackupVideo({ userToken, camera }, callback);
        };

        getVideo(res => {
            if (Array.isArray(res)) {
                setEvents(res);
            }
        }).then(console.log('getVideo_navigation', events));
    }, [navigation, params, props]);

    const renderTabBar = props => () => {
        let { tabs, goToPage, activeTab } = props;
        return (
            <View style={styles.tabs}>
                {tabs.map((tab, i) => (
                    <TouchableOpacity
                        key={tab}
                        onPress={() => goToPage(i)}
                        style={[
                            styles.tab,
                            activeTab === i ? styles.activeTab : styles.inactiveTab,
                        ]}
                    >
                        <Text
                            font={{ type: activeTab === i ? 'bold' : 'regular' }}
                            style={{ color: activeTab === i ? '#222222' : '#8d919d' }}
                        >
                            {tab}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        );
    };

    const detailScreens = () => (
        <ScrollableTabView
            // tabBarBackgroundColor={Colors.screen}
            // tabBarActiveTextColor={Colors.violet}
            initialPage={0}
            // onChangeTab={onChangeTab}
            // onScroll={onScrollTab}
            style={styles.containerTab}
            renderTabBar={props => <CustomTab {...props} />}
            locked={false}
            contentProps={{
                keyboardShouldPersistTaps: 'always',
            }}
        >
            <CameraStream tabLabel="Camera trực tiếp" {...params} />
            <CameraVideos tabLabel="Thư viện " events={events} camera={params.camera} />
        </ScrollableTabView>
    );

    return (
        <Drawer.Navigator
            initialRouteName={'Camera'}
            drawerPosition={'right'}
            drawerType={'front'}
            drawerContent={props => <DrawerContent {...props} />}
        >
            <Drawer.Screen
                name={'Camera'}
                component={!events || events.length > 0 ? detailScreens : CameraStream}
                initialParams={params}
            />
            <Drawer.Screen name={'Edit'} component={EditCamera} initialParams={params} />
        </Drawer.Navigator>
    );
};

module.exports = CameraTabs;
