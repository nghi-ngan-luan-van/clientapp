import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { AuthContext } from './AppNavigator';
import { AppRoute } from './app-routes';
import AddingCamera from '../screens/adding/AddingCamera';
import HomeScreen from '../screens/HomeScreen';
import CameraVideos from '../screens/details/CameraVideos';
import { Image, StyleSheet, View, Dimensions, TouchableOpacity, Text } from 'react-native';
import EditCamera from '../screens/editcamera/index';
import { Colors } from '../utils/AppConfig';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

import SettingsDrawer from './CameraTabs';
import EditMode from '../screens/editcamera/EditMode';
import CameraTabs from './CameraTabs';
import MyProfile from './../screens/profile/MyProfile';
import VideoPlayerScreen from '../screens/media/VideoPlayerScreen';
import { DrawerActions } from 'react-navigation-drawer';
import ChangePassword from '../screens/profile/ChangePassword';
import { Icon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

export const getHeaderTitle = route => {
    const routeName =
        route && route.name
            ? route.name
            : route.state
            ? // Get the currently active route name in the tab navigator
              route.state.routes[route.state.index].name
            : // If state doesn't exist, we need to default to `screen` param if available, or the initial screen
              // In our case, it's "Feed" as that's the first screen inside the navigator
              route.params?.screen || 'Feed';

    switch (routeName) {
        case AppRoute.HOME:
            return 'Danh sách thiết bị';
        case AppRoute.CAMERA_DETAIL:
            return 'Chi tiết';
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

function DrawerContent() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Drawer content</Text>
        </View>
    );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator
            showLabel={false}
            swipeEnabled
            initialRouteName={AppRoute.HOME}
            labelPosition={'beside-icon'}
        >
            <Tab.Screen
                options={{
                    // tabBarAccessibilityLabel: '0',
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
                component={HomeScreenStack}
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
}
const ProfileStack = createStackNavigator();
const ProfileScreenStack = () => {
    return (
        <ProfileStack.Navigator
            initialRouteName={AppRoute.PROFILE}
            screenOptions={({ route = {} }) => ({
                animationEnabled: true,
                headerBackTitleVisible: false,
                headerStyle: { backgroundColor: Colors.screen },
                headerTitle: getHeaderTitle(route),
                headerBackImage: () => (
                    <Image
                        style={{ width: 18, height: 18, marginLeft: 12 }}
                        source={require('../assets/ic_back.png')}
                    />
                ),
            })}
            headerMode="screen"
        >
            <ProfileStack.Screen name={AppRoute.PROFILE} component={MyProfile} />
            <ProfileStack.Screen name={AppRoute.CHANGE_PASS} component={ChangePassword} />
        </ProfileStack.Navigator>
        // <Drawer.Navigator drawerContent={() => <DrawerContent />}>
        //     <Drawer.Screen name="Home" component={HomeScreenStack} />
        // </Drawer.Navigator>
    );
};

export default function HomeNavigator() {
    return MyTabs();
}
export function HomeScreenStack(props) {
    const onPressAdd = navigation => {
        navigation && navigation.push(AppRoute.ADD_CAMERA);
    };

    return (
        <Stack.Navigator
            {...props}
            initialRouteName={AppRoute.HOME}
            screenOptions={({ route = {} }) => ({
                animationEnabled: true,
                headerBackTitleVisible: false,
                headerStyle: { backgroundColor: Colors.screen },
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
            <Stack.Screen
                name={AppRoute.HOME}
                component={HomeScreen}
                options={({ navigation }) => ({
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => {
                                // navigation &&
                                //     navigation.dispatch &&
                                //     navigation.dispatch(DrawerActions.openDrawer());
                                // DrawerActions.toggleDrawer();
                            }}
                        >
                            <Image
                                style={{ margin: 12, width: 30, height: 30 }}
                                source={require('../assets/ic_rainbow.png')}
                            />
                        </TouchableOpacity>
                    ),
                    // headerRight: () => (
                    //     <TouchableOpacity onPress={() => onPressAdd(navigation)}>
                    //         <Image
                    //             style={{ margin: 12, width: 30, height: 30 }}
                    //             source={require('../assets/icon_add.png')}
                    //         />
                    //     </TouchableOpacity>
                    // ),
                })}
                initialParams={props.route && props.route.params}
            />
            <Stack.Screen name={AppRoute.ADD_CAMERA} component={AddingCamera} />
            <Stack.Screen
                name={AppRoute.CAMERA_DETAIL}
                component={CameraTabs}
                options={({ route }) => ({
                    headerBackground: () => (
                        <LinearGradient
                            style={{ flex: 1, padding: 12 }}
                            colors={[Colors.brandy_rose, Colors.pigeon_post, Colors.purple_blue]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                        />
                    ),
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={() => {
                                // DrawerActions.toggleDrawer();
                            }}
                        >
                            <Image
                                style={{ margin: 12, width: 30, height: 30 }}
                                source={require('../assets/ic_settings.png')}
                            />
                        </TouchableOpacity>
                    ),

                    headerStyle: { backgroundColor: Colors.screen },
                })}
            />
            <Stack.Screen name={AppRoute.MEDIA} component={CameraVideos} />
            <Stack.Screen name={AppRoute.VIDEO_PLAYER_SCREEN} component={VideoPlayerScreen} />

            <Stack.Screen name={AppRoute.CAMERA_EDIT} component={EditCamera} />
            <Stack.Screen name={AppRoute.CAMERA_EDIT_MODE} component={EditMode} />

            <Stack.Screen name={AppRoute.SETTINGS} component={SettingsDrawer} />
        </Stack.Navigator>
    );
}
