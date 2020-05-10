import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
// import Welcome from '../screens/Welcome';
import { AppRoute } from './app-routes';
import Media from '../screens/Media';
import MediaDetail from '../screens/media/MediaDetail'
import AddingCamera from '../screens/adding/AddingCamera';
import HomeScreen from '../screens/HomeScreen'
const Stack = createStackNavigator();

export default class MediaNavigator extends React.PureComponent {
    render() {
        return (
            <Stack.Navigator {...this.props} headerMode='none' initialRouteName={AppRoute.MEDIA}>
                <Stack.Screen name={AppRoute.MEDIA} component={Media} />
                <Stack.Screen name={AppRoute.MEDIA_DETAIL} component={MediaDetail} />
            </Stack.Navigator>
        );
    }
}