import React, { Component } from 'react';
import { Button, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeNavigator from './HomeNavigator';
import MediaNavigator from './MediaNavigator';
import PlayBackTimeline from '../screens/playback/PlayBackTimeline';


export const MenuButton = ({ navigation }) => {
    return (
        <TouchableOpacity
            style={{ paddingHorizontal: 12 }}
            onPress={() => {
                navigation.toggleDrawer();
            }}
        >
            <Image
                source={require('../assets/ic_menu_color.png')}
                style={{ alignSelf: 'flex-start', width: 25, height: 30 }} resizeMode={'contain'}
            />
        </TouchableOpacity>
    );
};

const Drawer = createDrawerNavigator();
const RootStack = createStackNavigator();
export const DrawerScreen = () => (
    <Drawer.Navigator
        initialRouteName="Home"

    >
        <Drawer.Screen
            name="Home"
            component={HomeNavigator}
            options={{
                title: 'Home'
            }}

        />

        <Drawer.Screen
            name="Media"
            component={MediaNavigator}
            options={{
                title: 'PlayBack'
            }} />
    </Drawer.Navigator>
);

const RootStackScreen = ({ userToken }) => (
    <RootStack.Navigator headerMode="none">
        <RootStack.Screen
            name="App"
            component={DrawerScreen}
            options={{
                animationEnabled: false,

            }}
        />

    </RootStack.Navigator>
);
// const RootStackScreen = ({userToken}) => (
//     <RootStack.Navigator headerMode="none">
//         {userToken ? (
//             <RootStack.Screen
//                 name="App"
//                 component={DrawerScreen}
//                 options={{
//                     animationEnabled: false,
//                 }}
//             />
//         ) : (
//             <RootStack.Screen
//                 name="Auth"
//                 component={AuthStackScreen}
//                 options={{
//                     animationEnabled: false,
//                 }}
//             />
//         )}
//     </RootStack.Navigator>
// );
export default () => {

    return (
        <NavigationContainer>
            <RootStackScreen />
        </NavigationContainer>
    );
};
