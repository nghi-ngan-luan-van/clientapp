import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { AppRoute } from './app-routes';
import AddingCamera from '../screens/adding/AddingCamera';
import HomeScreen from '../screens/HomeScreen';
import CameraVideos from '../screens/details/CameraVideos';
import { Image, StyleSheet, View, Dimensions, TouchableOpacity, Text } from 'react-native';
import EditCamera from '../screens/editcamera/index';
import { Colors } from '../utils/AppConfig';

const Stack = createStackNavigator();

import SettingsDrawer from './CameraTabs';
import EditMode from '../screens/editcamera/EditMode';
import CameraTabs from './CameraTabs';
import MyProfile from './../screens/profile/MyProfile';
import VideoPlayerScreen from '../screens/media/VideoPlayerScreen';
import ChangePassword from '../screens/profile/ChangePassword';
import { Icon } from 'react-native-elements';

export const getHeaderTitle = route => {
    const routeName =
        route && route.name
            ? route.name
            : route.state
            ? // Get the currently active route name in the tab navigator
              route.state.routes[route.state.index].name
            : route.params?.screen || 'Feed';

    switch (routeName) {
        case AppRoute.HOME:
            return 'Danh sách thiết bị';
        case AppRoute.CAMERA_DETAIL:
            return '';
        // return 'Chi tiết';
        case AppRoute.ADD_CAMERA:
            return 'Thêm camera';
        case AppRoute.SIGN_UP:
            return 'Đăng ký';
        case AppRoute.PROFILE:
            return 'Tài khoản của tôi';
        case AppRoute.CHANGE_PASS:
            return 'Đổi mật khẩu';
    }
};

const Tab = createBottomTabNavigator();

const MyTabs = props => {
    return (
        <Tab.Navigator
            {...props}
            initialRouteName={AppRoute.HOME}
            tabBarOptions={{
                activeTintColor: Colors.purple_blue,
                inactiveTintColor: 'gray',
            }}
        >
            <Tab.Screen
                initialParams={props.route.params}
                options={{
                    tabBarAccessibilityLabel: 'here',
                    // tabBarButton: () => <View style={{ flex: 1, backgroundColor: 'red' }} />,
                    tabBarLabel: 'Trang chủ',
                    tabBarIcon: props => (
                        <Icon
                            name="home"
                            type={'ant-design'}
                            size={30}
                            color={props.focused ? Colors.brandy_rose : Colors.grey}
                        />
                    ),
                }}
                name={AppRoute.HOME}
                component={HomeScreen}
            />
            <Tab.Screen
                options={{
                    // tabBarButton:
                    tabBarLabel: 'Cá nhân',
                    tabBarIcon: props => (
                        <Icon
                            name="people"
                            type={'ant-design'}
                            size={30}
                            color={props.focused ? Colors.brandy_rose : Colors.grey}
                        />
                    ),
                }}
                name={AppRoute.PROFILE}
                component={ProfileScreenStack}
            />
        </Tab.Navigator>
    );
};
const ProfileStack = createStackNavigator();
const ProfileScreenStack = () => {
    return (
        <ProfileStack.Navigator
            initialRouteName={AppRoute.PROFILE}
            screenOptions={({ route = {} }) => ({
                animationEnabled: true,
                headerBackTitleVisible: false,
                headerStyle: { backgroundColor: Colors.white },
                headerTitle: getHeaderTitle(route),
                headerBackImage: () => (
                    <Image
                        style={{ width: 18, height: 18, marginLeft: 12 }}
                        source={require('../assets/ic_back.png')}
                    />
                ),
            })}
            headerMode="float"
        >
            <ProfileStack.Screen name={AppRoute.PROFILE} component={MyProfile} />
            <ProfileStack.Screen name={AppRoute.CHANGE_PASS} component={ChangePassword} />
        </ProfileStack.Navigator>
    );
};

export default function HomeNavigator(props) {
    return HomeScreenStack(props);
}
export function HomeScreenStack(props) {
    return (
        <Stack.Navigator
            {...props}
            initialRouteName={AppRoute.HOME}
            screenOptions={({ route = {} }) => ({
                animationEnabled: true,
                headerTitle: getHeaderTitle(route),
                headerTitleStyle: { color: 'white' },
                // headerStyle: { backgroundColor: Colors.screen },
                headerBackTitleStyle: { color: Colors.purple_blue, fontSize: 19 },
                // headerBackImage:,
                headerBackImage: () => (
                    <Icon
                        type={'font-awesome'}
                        name={'arrow-left'}
                        color={Colors.purple_blue}
                        style={{ marginHorizontal: 12 }}
                        source={require('../assets/ic_back.png')}
                    />
                ),
            })}
            headerMode="screen"
        >
            <Stack.Screen
                name={AppRoute.HOME}
                component={MyTabs}
                initialParams={props.route && props.route.params}
                options={({ navigation }) => ({
                    header: () => <View />,
                })}
            />
            <Stack.Screen name={AppRoute.ADD_CAMERA} component={AddingCamera} />
            <Stack.Screen name={AppRoute.CAMERA_DETAIL} component={CameraTabs} />
            <Stack.Screen name={AppRoute.MEDIA} component={CameraVideos} />
            <Stack.Screen name={AppRoute.VIDEO_PLAYER_SCREEN} component={VideoPlayerScreen} />

            <Stack.Screen name={AppRoute.CAMERA_EDIT} component={EditCamera} />
            <Stack.Screen name={AppRoute.CAMERA_EDIT_MODE} component={EditMode} />

            <Stack.Screen name={AppRoute.SETTINGS} component={SettingsDrawer} />
        </Stack.Navigator>
    );
}
