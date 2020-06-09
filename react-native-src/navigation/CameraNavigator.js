import React from 'react';
import {Button, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import SettingsDrawer from './CameraTabs';
import CameraStream from '../screens/CameraStream';

const Drawer = createDrawerNavigator();
const CameraNavigator = (props) => {
  return (
    <Drawer.Navigator initialRouteName="CameraStream">
      <Drawer.Screen
        options={props.route}
        name="1234567"
        component={CameraStream}

      />

    </Drawer.Navigator>
  );
};

module.exports = CameraNavigator;
const styles = StyleSheet.create({});
