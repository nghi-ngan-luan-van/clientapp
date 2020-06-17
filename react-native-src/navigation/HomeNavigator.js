import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AppRoute } from './app-routes';
import AddingCamera from '../screens/adding/AddingCamera';
import HomeScreen from '../screens/HomeScreen';
import Media from '../screens/Media';
import CameraVideos from "../screens/details/CameraVideos";
import MediaDetail from '../screens/media/MediaDetail';
import { View} from 'react-native'
import EditCamera from '../screens/editcamera/index';
const Stack = createStackNavigator();
import Header from "../components/Header";
import SettingsDrawer from "./CameraTabs";
import EditMode from '../screens/editcamera/EditMode';
import CameraTabs from './CameraTabs'
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
                        
                    })}
                    initialParams={this.props.route && this.props.route.params}
                />
                <Stack.Screen name={AppRoute.ADD_CAMERA} component={AddingCamera} />
                 <Stack.Screen name={AppRoute.CAMERA_DETAIL} component={CameraTabs}
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