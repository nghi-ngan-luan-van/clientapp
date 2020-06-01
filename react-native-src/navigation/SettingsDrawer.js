import React, {useRef, useLayoutEffect} from 'react';
import {DrawerActions, NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
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
// const Tab = createBottomTabNavigator();
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

// function MyTabs() {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="Home" component={HomeScreen} />
//       <Tab.Screen name="Settings" component={SettingsScreen} />
//     </Tab.Navigator>
//   );
// }
// function DrawerContent() {
//   return (
//     <DrawerContentScrollView {...props}>
//       <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//         <Text>Drawer content</Text>
//       </View>
//     </DrawerContentScrollView>
//   );
// }
function CameraEditInfor(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>CameraEditInfor</Text>
      </View>
    </DrawerContentScrollView>
  );
}
function CameraSetting(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Drawer content</Text>
      </View>
    </DrawerContentScrollView>
  );
}

function DrawerContent(props) {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator>
        <Tab.Screen key={0} name="CameraEditInfor" component={CameraEditInfor} />
        <Tab.Screen key={1} name="Settings" component={CameraSetting} />
      </Tab.Navigator>
    </NavigationContainer>
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
      <Drawer.Screen name="CameraEditInfor" component={CameraEditInfor} />
      <Drawer.Screen name="Settings1" component={CameraSetting} />
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
