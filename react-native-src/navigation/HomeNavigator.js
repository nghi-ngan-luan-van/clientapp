import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AppRoute } from './app-routes';
import AddingCamera from '../screens/adding/AddingCamera';
import HomeScreen from '../screens/HomeScreen';
import Media from '../screens/Media';
import MediaDetail from '../screens/media/MediaDetail';
import CameraDetails from '../screens/CameraDetails';
import { Icon } from 'react-native-elements';
import MenuButton from './index';
import { Image, TouchableOpacity } from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler';

const Stack = createStackNavigator();

export default class HomeNavigator extends React.PureComponent {
    render() {
        return (
            <Stack.Navigator {...this.props} initialRouteName={AppRoute.HOME}

                options={({ navigation }) => ({
                    animationEnabled: false,
                })}
            >
                <Stack.Screen name={AppRoute.HOME} component={HomeScreen}
                    options={({ navigation }) => ({
                        headerLeft: () => (
                            <TouchableOpacity
                                style={{ width: 24, height: 24, marginLeft: 12 }}

                                onPress={() => navigation.toggleDrawer()}
                            >
                                <Image
                                    style={{ width: 24, height: 24 }}
                                    source={require('../assets/ic_menu.png')}

                                />
                            </TouchableOpacity>

                        ),
                        headerRight: () => (
                            <Icon
                                raised
                                name='plus'
                                type='font-awesome'
                                color='blue'
                                onPress={() => navigation.push(AppRoute.ADD_CAMERA)} />
                        ),


                    })} />
                <Stack.Screen name={AppRoute.ADD_CAMERA} component={AddingCamera} />

                <Stack.Screen name={AppRoute.CAMERA_DETAIL} component={CameraDetails} />


                <Stack.Screen name={AppRoute.MEDIA} component={Media} />
                <Stack.Screen name={AppRoute.MEDIA_DETAIL} component={MediaDetail} />
            </Stack.Navigator>
        );
    }
}