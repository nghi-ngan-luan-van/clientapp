import React, {useLayoutEffect, useRef, useState} from 'react';
import {Dimensions, Image, Text, View, StyleSheet, TouchableOpacity, Switch} from 'react-native';

import { Icon} from 'react-native-elements';
import ScrollableTabView from 'react-native-scrollable-tab-view'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Colors} from '../utils/AppConfig';
import _ from 'lodash'
import Media from "../screens/Media";
import CameraStream from '../screens/CameraStream';

import {createDrawerNavigator,DrawerItem, DrawerContentScrollView,} from "@react-navigation/drawer";
import {DrawerActions} from "@react-navigation/native";
import EditCamera from "../screens/editcamera";

const Tab = createMaterialTopTabNavigator();
const Drawer = createDrawerNavigator();
const WIDTH = Dimensions.get('window').width;
const CameraDrawer = () => {

}
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
    label:{
        fontSize:16,
        color: Colors.text
    }
});

function DrawerContent(props) {
    const {navigation} = props;
    const camera = _.get(props, 'state.routes[0].params.camera',{})
    const [isEnabled, setIsEnabled] = useState(camera.backupMode);
    const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

    return (
        <DrawerContentScrollView
            contentContainerStyle={{ paddingHorizontal:12}}
        >
            <DrawerItem
                // focused
                icon={() => (
                    <Icon
                        // style={{width:36,height:36}}
                        name= 'camera'
                        color='#7b79db'
                        type='font-awesome'
                    />
                )}
                label={camera.name}
                labelStyle={styles.label}
                onPress={() => navigation && navigation.navigate && navigation.navigate('Camera')}

            />
            <DrawerItem
                icon={() => (
                    <Image
                        style={{width:30,height:30}}
                        source={require('../assets/ic_edit.png')}
                    />
                )}
                label="Edit camera infor"
                labelStyle={styles.label}
                onPress={() => {navigation && navigation.navigate && navigation.navigate('Edit')}}
            />
            <DrawerItem
                icon={() => (
                    <Switch
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                )}
                label="Change backup mode"
                labelStyle={styles.label}
            />

        </DrawerContentScrollView>
    );
}

const CameraTabs = (props) => {
    const {navigation} = props;
    const params = _.get(props, 'route.params.params')
    const settingRef = useRef();

    useLayoutEffect(() => {
        const onPressSetting = () => {
            navigation && navigation.dispatch(DrawerActions.toggleDrawer());
        }
        navigation.setOptions({
            headerRight: (
                <View>
                <TouchableOpacity
                    ref={settingRef}
                    onPress={onPressSetting}
                >
                    <Image
                        source={require('../assets/ic_settings.png')}
                        style={styles.rightButton}
                    />
                </TouchableOpacity>

        </View>
            ),
        }),
            [props];
    });


    const TabNavigator= ()=>
        <ScrollableTabView
        // initialRouteName={AppRoute.CAMERA_STREAM}
        // shifting={true}
        // sceneAnimationEnabled={false}
        // tabBarOptions={{
        //     style: {borderRadius: 8, backgroundColor: Colors.screen},
        //     pressColor: Colors.light,
        //     activeTintColor: Colors.purple_blue,
        //     inactiveTintColor: Colors.text,
        // }}

    >
            <CameraStream tabLabel="Stream" {...params}/>
            <Media tabLabel="Media" {...params}/>
        {/*<Tab.Screen*/}
        {/*    name={AppRoute.CAMERA_STREAM}*/}
        {/*    initialParams={params}*/}
        {/*    component={CameraStream}/>*/}
        {/*<Tab.Screen*/}
        {/*    options={{*/}
        {/*        tabBarIcon: 'bell-outline',*/}
        {/*    }}*/}
        {/*    name={AppRoute.MEDIA}*/}
        {/*    initialParams={params}*/}
        {/*    component={Media}/>*/}
    </ScrollableTabView>

    return (
        <Drawer.Navigator initialRouteName={'Camera'}
                          drawerPosition={'right'}
                          drawerType={'front'}
                          drawerContent={(props) => <DrawerContent {...props}/>}
                         >
            <Drawer.Screen name={'Camera'} component={TabNavigator} initialParams={params}/>
            <Drawer.Screen name={'Edit'} component={EditCamera} initialParams={params} />
        </Drawer.Navigator>

    );
};


module.exports = CameraTabs;
