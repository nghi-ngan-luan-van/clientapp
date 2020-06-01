import React from 'react';
import {Button, TouchableOpacity, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeNavigator from './HomeNavigator';

const Drawer = createDrawerNavigator();
const RootStack = createStackNavigator();
export const DrawerScreen = () => (
  <Drawer.Navigator initialRouteName="Home">
    <Drawer.Screen
      name="Home"
      component={HomeNavigator}
      options={{
        title: 'Home',
      }}
    />
  </Drawer.Navigator>
);

export default () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator headerMode="none">
        <RootStack.Screen
          name="App"
          component={HomeNavigator}
          options={{
            animationEnabled: false,
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
