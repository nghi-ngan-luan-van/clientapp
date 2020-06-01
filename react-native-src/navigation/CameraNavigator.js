import React from 'react';
import {Button, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import SettingsDrawer from './SettingsDrawer';
import CameraDetails from '../screens/CameraDetails';

const Drawer = createDrawerNavigator();
const CameraNavigator = (props) => {
  return (
    <Drawer.Navigator initialRouteName="CameraDetails">
      <Drawer.Screen
        options={props.route}
        name="1234567"
        component={CameraDetails}
        options={{
          
        }}
      />

    </Drawer.Navigator>
  );
};

module.exports = CameraNavigator;
const styles = StyleSheet.create({});
