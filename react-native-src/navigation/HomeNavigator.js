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

const Stack = createStackNavigator();


export default class HomeNavigator extends React.PureComponent {
    render() {
        return (
            <Stack.Navigator {...this.props} initialRouteName={AppRoute.HOME}

                options={({ navigation }) => ({
                    headerLeft: () => (
                        <MenuButton navigation={navigation} />
                    ),
                    animationEnabled: false,
                })}
            >
                <Stack.Screen name={AppRoute.HOME} component={HomeScreen}
                    options={({ navigation }) => ({
                        headerLeft: () => (
                            <Icon
                                raised
                                name='profile'
                                type='font-awesome'
                                color='blue'
                                onPress={() => navigation.toggleDrawer()}
                            />
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