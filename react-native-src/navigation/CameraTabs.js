import React, {useLayoutEffect} from 'react';
import {Dimensions, Image, StyleSheet, TouchableOpacity,} from 'react-native';
import Media from "../screens/Media";
import CameraDetails from '../screens/CameraDetails';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {AppRoute} from "./app-routes";
import _ from 'lodash'
const Tab = createMaterialTopTabNavigator();
const WIDTH = Dimensions.get('window').width;

const CameraTabs = (props) => {
    const {route, navigation} = props;
    const params = _.get(props,'route.params.params')
    useLayoutEffect(() => {
        // navigation.setParams({...route.params})
        navigation.setOptions({
            headerRight: (
                <TouchableOpacity
                >
                    <Image
                        source={require('../assets/ic_settings.png')}
                        style={styles.rightButton}
                    />
                </TouchableOpacity>
            ),
        }),
            [props];
    });

    return (
        <Tab.Navigator
            initialRouteName={AppRoute.CAMERA_STREAM}
            shifting={true}
            sceneAnimationEnabled={false}

            // screenOptions={({ route }) => ({
            //     tabBarIcon: ({ focused, color, size }) => {
            //         let iconName;
            //
            //         if (route.name === 'Home') {
            //             iconName = focused
            //                 ? 'ios-information-circle'
            //                 : 'ios-information-circle-outline';
            //         } else if (route.name === 'Settings') {
            //             iconName = focused ? 'ios-list-box' : 'ios-list';
            //         }
            //
            //         // You can return any component that you like here!
            //         return <Icon name={iconName} size={size} color={color} />;
            //     },
            // })}
            tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
            }}

        >
            <Tab.Screen
                options={{
                    tabBarIcon: { focused: true, color: 'red' },
                }}
                name={AppRoute.CAMERA_STREAM}
                initialParams={params}
                component={CameraDetails}/>
            <Tab.Screen
                options={{
                    tabBarIcon: 'bell-outline',
                }}
                name={AppRoute.MEDIA}
                initialParams={params}
                component={Media}/>
        </Tab.Navigator>
    );
};

module.exports = CameraTabs;
const styles = StyleSheet.create({
    container: {
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    rightButton: {
        width: 37,
        height: 37,
    },
});
