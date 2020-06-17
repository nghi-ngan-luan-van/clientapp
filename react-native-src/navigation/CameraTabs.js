import React, {useLayoutEffect, useRef, useState} from 'react';
import {Dimensions, Image, Text, View, StyleSheet, TouchableOpacity, Switch} from 'react-native';

import { Icon} from 'react-native-elements';
import ScrollableTabView from 'react-native-scrollable-tab-view'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Colors} from '../utils/AppConfig';
import _ from 'lodash'
import CameraStream from '../screens/details/CameraStream';

import {createDrawerNavigator,DrawerItem, DrawerContentScrollView,} from "@react-navigation/drawer";
import {DrawerActions} from "@react-navigation/native";
import EditCamera from "../screens/editcamera";
import {getMovingEvents} from "../utils/ApiUtils";
import AsyncStorage from "@react-native-community/async-storage";
import data from '../utils/sample'
import CameraVideos from "../screens/details/CameraVideos";
import CustomTabBar from "../components/CustomTabBar";
const Tab = createMaterialTopTabNavigator();
const Drawer = createDrawerNavigator();
const WIDTH = Dimensions.get('window').width;

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
    const [events, setEvents]= useState(data.events)
    useLayoutEffect(() => {
        const onPressSetting = () => {
            navigation && navigation.dispatch(DrawerActions.toggleDrawer());
        }
        let {camera} = params
        const getVideo = async (callback)=>{
            let userToken = await AsyncStorage.getItem('userToken')
             getMovingEvents({userToken, camera },callback, )
        }

        getVideo((res)=>{
            console.log(res)
            if(Array.isArray(res)){
                setEvents(res)
            }
        });


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

   const detailScreens = ()=>
       <ScrollableTabView
           locked
           // tabBarUnderlineColor="#EDEEEE"
           // tabBarBackgroundColor="#4A90E2"
           // tabBarActiveTextColor="#FFFFFF"
           // tabBarTextStyle={{ fontSize: 15, lineHeight: 21, align }}
           // tabBarInactiveTextColor="#B6CFD7"
           // renderTabBar={() => <CustomTabBar someProp={'here'}/>}
       >
           <CameraStream tabLabel="Stream" {...params} />
           <CameraVideos tabLabel="Media" events={events}/>
       </ScrollableTabView>

    return (
        <Drawer.Navigator initialRouteName={'Camera'}
                          drawerPosition={'right'}
                          drawerType={'front'}
                          drawerContent={(props) => <DrawerContent {...props}/>}
                         >
            <Drawer.Screen name={'Camera'} component={events.length>0 ?detailScreens: CameraStream} initialParams={params}/>
            <Drawer.Screen name={'Edit'} component={EditCamera} initialParams={params} />
        </Drawer.Navigator>

    );
};


module.exports = CameraTabs;
