import React, { useContext, useEffect, useRef, useState } from 'react';
import { Image, useWindowDimensions, StyleSheet, TouchableOpacity } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { Colors } from '../utils/AppConfig';
import _ from 'lodash';
import CameraStream from '../screens/details/CameraStream';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';
import EditCamera from '../screens/editcamera';
import CameraVideos from '../screens/details/CameraVideos';
import CustomTab from '../components/CustomTab';
import DrawerContent from './DrawerContent';
import { AuthContext } from './AppNavigator';
const Drawer = createDrawerNavigator();
const styles = StyleSheet.create({
    rightIcon: {
        alignSelf: 'center',
        width: 26,
        height: 26,
    },

    icon: {
        backgroundColor: Colors.whisper,
        padding: 5,
        borderRadius: 18,
        marginRight: 12,
    },
});

const CameraTabs = props => {
    const { signOut } = useContext(AuthContext);
    const params = _.get(props, 'route.params.params');
    let { navigation } = props;
    const dimensions = useWindowDimensions();

    const isLargeScreen = dimensions.width >= 768;

    useEffect(() => {
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
            overlayColor="transparent"
            drawerType={isLargeScreen ? 'permanent' : 'back'}
            drawerContent={props => <DrawerContent {...props} signOut={signOut} />}
        >
            <Drawer.Screen name={'Chi tiết camera'} component={Detail} initialParams={params} />
            <Drawer.Screen
                name={'Chỉnh sửa thông tin'}
                component={EditCamera}
                initialParams={params}
            />
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
        <CameraStream tabLabel="Trực tiếp" {...params} {...props} />
        <CameraVideos tabLabel="Thư viện " camera={params && params.camera} {...props} />
    </ScrollableTabView>
);
module.exports = CameraTabs;
