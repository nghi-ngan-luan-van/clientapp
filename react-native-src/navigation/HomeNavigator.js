import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AppRoute } from './app-routes';
import AddingCamera from '../screens/adding/AddingCamera';
import HomeScreen from '../screens/HomeScreen';
import Media from '../screens/Media';
import CameraVideos from '../screens/details/CameraVideos';
import MediaDetail from '../screens/media/MediaDetail';
import { Image, StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native';
import EditCamera from '../screens/editcamera/index';
import { Colors } from '../utils/AppConfig';
const Stack = createStackNavigator();

import Header from '../components/Header';
import SettingsDrawer from './CameraTabs';
import EditMode from '../screens/editcamera/EditMode';
import CameraTabs from './CameraTabs';
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    backgroundImg: {
        width,
        overflow: 'hidden',
    },
});
export default class HomeNavigator extends React.PureComponent {
    getHeaderTitle(route) {
        console.log(route);
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
            case 'Account':
                return 'My account';
        }
    }
    render() {
        return (
            <Stack.Navigator
                {...this.props}
                initialRouteName={AppRoute.HOME}
                screenOptions={({ route = {} }) => ({
                    animationEnabled: true,
                    // headerTransparent:true,
                    headerBackTitleVisible: false,
                    headerStyle: { backgroundColor: Colors.screen },
                    headerTitle: this.getHeaderTitle(route),
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
                            <TouchableOpacity>
                                <Image
                                    style={{ margin: 12, width: 30, height: 30 }}
                                    source={require('../assets/ic_rainbow.png')}
                                />
                            </TouchableOpacity>
                        ),
                    })}
                    initialParams={this.props.route && this.props.route.params}
                />
                <Stack.Screen name={AppRoute.ADD_CAMERA} component={AddingCamera} />
                <Stack.Screen
                    name={AppRoute.CAMERA_DETAIL}
                    component={CameraTabs}
                    options={({ route }) => ({
                        // header: () => {
                        //     return ( <View/>);
                        // },
                        // headerShown:false,
                        // headerTitle: 'Hello',
                        headerStyle: { backgroundColor: Colors.screen },
                    })}
                />
                <Stack.Screen name={AppRoute.MEDIA} component={CameraVideos} />
                <Stack.Screen name={AppRoute.MEDIA_DETAIL} component={MediaDetail} />
                <Stack.Screen name={AppRoute.CAMERA_EDIT} component={EditCamera} />
                <Stack.Screen name={AppRoute.CAMERA_EDIT_MODE} component={EditMode} />

                <Stack.Screen name={AppRoute.SETTINGS} component={SettingsDrawer} />
            </Stack.Navigator>
        );
    }
}
