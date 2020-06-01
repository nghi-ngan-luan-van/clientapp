import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AppRoute } from './app-routes';
import AddingCamera from '../screens/adding/AddingCamera';
import HomeScreen from '../screens/HomeScreen';
import Media from '../screens/Media';
import MediaDetail from '../screens/media/MediaDetail';
import CameraDetails from '../screens/CameraDetails';
import CameraNavigator from './CameraNavigator';
import { Icon } from 'react-native-elements';
import {Image, TouchableOpacity, View, Text, Button} from 'react-native'
import EditCamera from '../screens/editcamera';
// import Home from '../fromscreens/main/Home';
const Stack = createStackNavigator();
import Header from "../components/Header";
import SettingsDrawer from "../navigation/SettingsDrawer";

export default class HomeNavigator extends React.PureComponent {
    render() {
        return (
            <Stack.Navigator {...this.props} initialRouteName={AppRoute.HOME}
            screenOptions={( props ) => ({
                    animationEnabled: false,
                    header: (props) => ( <Header {...props}/>)
                })}
                headerMode='float'
            >
                <Stack.Screen
                    headerMode={'none'}
                    name={AppRoute.HOME}
                    component={HomeScreen}
                    options={({  }) => ({
                        header: () => {
                            return ( <View/>);
                          },
                        
                    })} />
                <Stack.Screen name={AppRoute.ADD_CAMERA} component={AddingCamera} />


                 <Stack.Screen name={AppRoute.CAMERA_DETAIL} component={SettingsDrawer} 
                 />
                <Stack.Screen name={AppRoute.MEDIA} component={Media} />
                <Stack.Screen name={AppRoute.MEDIA_DETAIL} component={MediaDetail} />
                <Stack.Screen name={AppRoute.CAMERA_EDIT} component={EditCamera} />
                <Stack.Screen name={AppRoute.SETTINGS} component={SettingsDrawer} />

            </Stack.Navigator>
        );
    }
}