import React, {Component} from 'react';
import {Button, TouchableOpacity, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {AuthContext} from './context';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeScreen from '../screens/HomeScreen';
import CameraDetails from '../screens/CameraDetails';
import Media from '../media';
import SignIn from '../authentication/SignIn';
import CreateAccount from '../authentication/CreateAccount';

const AuthStack = createStackNavigator();


const MenuButton = ({navigation}) => {
    return (
        <TouchableOpacity
            style={{paddingHorizontal: 12}}
            onPress={() => {
                navigation.toggleDrawer();
            }}
        >
            <Image
                source={require('../assets/ic_menu_color.png')}
                style={{alignSelf: 'flex-start', width: 25, height: 30}} resizeMode={'contain'}
            />
        </TouchableOpacity>
    );
};


const AuthStackScreen = () => (
    <AuthStack.Navigator>
        <AuthStack.Screen
            name="SignIn"
            component={SignIn}
            options={{title: 'Sign In'}}
        />
        <AuthStack.Screen
            name="CreateAccount"
            component={CreateAccount}
            options={{title: 'Create Account'}}
        />

    </AuthStack.Navigator>
);

const Tabs = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const MediaStack = createStackNavigator();
const Drawer = createDrawerNavigator();
const RootStack = createStackNavigator();

const HomeStackScreen = () => (
    <HomeStack.Navigator>
        <HomeStack.Screen
            name="Home"
            component={HomeScreen}
            options={({navigation}) => ({
                headerLeft: () => (
                    <MenuButton navigation={navigation}/>
                ),


            })}


        />
        <HomeStack.Screen
            name="CameraDetails"
            component={CameraDetails}
            
        />
    </HomeStack.Navigator>
);

const MediaStackScreen = ({navigation}) => (
    <MediaStack.Navigator>
        <MediaStack.Screen
            name="Media"
            component={Media}
            options={{
                headerLeft: () => (
                    <MenuButton navigation={navigation}/>
                ),

                headerRight: () => (
                    <Button
                        onPress={() => alert('This is a button!')}
                        title="Alert"
                        color="#049DD9"
                    />
                ),
            }}
        />
    </MediaStack.Navigator>
);


// const createNavigationItemForRoute = (route): MenuItemType => {
//     const {options} = props.descriptors[route.key];
//     return {
//         routeName: route.name,
//         title: options.title,
//         icon: options.drawerIcon,
//     };
// };

const DrawerScreen = () => (
    <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen
            name="Home"
            component={HomeStackScreen}
            options={{
                title: 'Home'
            }}/>
        <Drawer.Screen name="Media" component={MediaStackScreen}/>
    </Drawer.Navigator>
);

const RootStackScreen = ({userToken}) => (
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
            <RootStackScreen/>
        </NavigationContainer>
    );
};
