import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AuthContext } from './AppNavigator';
import { AppRoute } from './app-routes';
import AddingCamera from '../screens/adding/AddingCamera';
import HomeScreen from '../screens/HomeScreen';
import Media from '../screens/Media';
import CameraVideos from '../screens/details/CameraVideos';
import MediaDetail from '../screens/media/MediaDetail';
import { Image, StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native';
import EditCamera from '../screens/editcamera/index';
import { Colors } from '../utils/AppConfig';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

import Header from '../components/Header';
import SettingsDrawer from './CameraTabs';
import EditMode from '../screens/editcamera/EditMode';
import CameraTabs from './CameraTabs';
import VideoPlayerScreen from '../screens/media/VideoPlayerScreen';
// import { DrawerActions } from 'react-navigation-drawer';

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    backgroundImg: {
        width,
        overflow: 'hidden',
    },
});

// export const FeedStack = () => {
//     return (
//         <Stack.Navigator initialRouteName="Feed">
//             <Stack.Screen name="Feed" component={Feed} options={{ headerTitle: 'Twitter' }} />
//             <Stack.Screen name="Details" component={Details} options={{ headerTitle: 'Tweet' }} />
//         </Stack.Navigator>
//     );
// };

export default function HomeNavigator(props) {
    const { signOut } = useContext(AuthContext);

    const getHeaderTitle = route => {
        // console.log(route);
        // Access the tab navigator's state using `route.state`
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
                return 'Thiết bị của bạn';
            case AppRoute.CAMERA_DETAIL:
                return 'Chi tiết';
            case AppRoute.ADD_CAMERA:
                return 'Thêm camera';
            case AppRoute.SIGN_UP:
                return 'Đăng ký';
        }
    };

    return (
        <Stack.Navigator
            {...props}
            initialRouteName={AppRoute.HOME}
            screenOptions={({ route = {} }) => ({
                animationEnabled: true,
                // headerTransparent:true,
                headerBackTitleVisible: false,
                headerStyle: { backgroundColor: Colors.screen },
                headerTitle: getHeaderTitle(route),
                headerBackImage: () => (
                    <Image
                        style={{ width: 18, height: 18, marginLeft: 12 }}
                        source={require('../assets/ic_back.png')}
                    />
                ),
                //     headerBackground:()=> <Image
                //     // style={styles.backgroundImg}
                //     source={require('../assets/background_image.png')}
                // />
                // header: (props) => ( <Header {...props}/>)
            })}
            headerMode="float"
        >
            <Stack.Screen
                name={AppRoute.HOME}
                component={HomeScreen}
                options={({ route }) => ({
                    // header: () => {
                    //     return ( <View/>);
                    // },
                    // headerShown:false,
                    // headerTitle: 'Hello',
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => {}}>
                            <Image
                                style={{ margin: 12, width: 30, height: 30 }}
                                source={require('../assets/ic_rainbow.png')}
                            />
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <TouchableOpacity onPress={() => signOut()}>
                            <Image
                                style={{ margin: 12, width: 30, height: 30 }}
                                source={require('../assets/ic_logout.png')}
                            />
                        </TouchableOpacity>
                    ),
                })}
                initialParams={props.route && props.route.params}
            />
            <Stack.Screen name={AppRoute.ADD_CAMERA} component={AddingCamera} />
            <Stack.Screen
                name={AppRoute.CAMERA_DETAIL}
                component={CameraTabs}
                options={({ route }) => ({
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

            <Stack.Screen name={AppRoute.MEDIA_DETAIL} component={MediaDetail} />
            <Stack.Screen name={AppRoute.CAMERA_EDIT} component={EditCamera} />
            <Stack.Screen name={AppRoute.CAMERA_EDIT_MODE} component={EditMode} />

            <Stack.Screen name={AppRoute.SETTINGS} component={SettingsDrawer} />
        </Stack.Navigator>
    );
}
