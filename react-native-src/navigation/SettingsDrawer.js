import React, {useRef, useLayoutEffect} from 'react';
import {DrawerActions} from '@react-navigation/native';

import {
  Button,
  TouchableOpacity,
  Image,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import {
  createDrawerNavigator,
  DrawerItem,
  DrawerContentScrollView,
} from '@react-navigation/drawer';

import CameraDetails from '../screens/CameraDetails';
const Drawer = createDrawerNavigator();

function DrawerContent() {
  return (
    <DrawerContentScrollView {...props}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Drawer content</Text>
      </View>
    </DrawerContentScrollView>
  );
}
const SettingsDrawer = (props) => {
  const {route, navigation} = props;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: (
        <TouchableOpacity
          onPress={() => {
            navigation.dispatch(DrawerActions.openDrawer());

            console.log(drawerRef);
            // drawerRef.current.props.navigation &&
            //   drawerRef.current.props.navigation.toggleDrawer();
          }}>
          <Image
            source={require('../assets/ic_settings.png')}
            style={styles.rightButton}
          />
        </TouchableOpacity>
      ),
    }),
      [props];
  });
  const drawerRef = useRef(null);

  return (
    <Drawer.Navigator
      drawerPosition="right"
      options={{drawerLabel: 'Profile'}}
      drawerContent={() => <DrawerContent />}>
      <Drawer.Screen
        name="Settings"
        component={CameraDetails}
        ref={(el) => (drawerRef = el)}
      />
    </Drawer.Navigator>
  );
};

module.exports = SettingsDrawer;
const styles = StyleSheet.create({
  rightButton: {
    width: 37,
    height: 37,
  },
});
