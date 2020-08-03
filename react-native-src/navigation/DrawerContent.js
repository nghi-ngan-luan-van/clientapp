import React, { useState } from 'react';
import { Image, StyleSheet, Switch } from 'react-native';
import { Icon } from 'react-native-elements';
import { Colors } from '../utils/AppConfig';
import _ from 'lodash';
import { DrawerItem, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-community/async-storage';

import { deleteCam, switchRecordMode, turnDetect } from '../utils/ApiUtils';
import { AppRoute } from './app-routes';
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    rightIcon: {
        alignSelf: 'center',
        width: 26,
        height: 26,
    },
    label: {
        flex: 1,
        marginLeft: 12,
        // backgroundColor: 'red',
        alignSelf: 'flex-start',
        fontSize: 16,
        color: Colors.text,
    },

    containerTab: {
        flex: 1,
        backgroundColor: Colors.black,
    },
});

export default function DrawerContent(props) {
    const { navigation } = props;

    const camera = _.get(props, 'state.routes[0].params.camera', {});
    const [isEnabled, setIsEnabled] = useState(camera.backupMode);

    const toggleSwitch = async () => {
        console.log(isEnabled);
        setIsEnabled(previousState => !previousState);
        if (isEnabled) {
            await onSwitchDetectMode();
        } else {
            await onSwitchRecordMode();
        }
    };

    const onSwitchDetectMode = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        const { _id } = camera;

        try {
            await turnDetect({ _id, userToken }, result => {
                if (result) {
                    navigation &&
                        navigation.navigate(AppRoute.HOME, {
                            screen: AppRoute.HOME,
                            params: { reload: true },
                        });
                } else {
                }
            });
        } catch (e) {
            console.log(e);
        }
    };

    const onSwitchRecordMode = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        const { _id } = camera;

        try {
            await switchRecordMode({ _id, userToken }, res => {
                if (res) {
                    navigation &&
                        navigation.navigate(AppRoute.HOME, {
                            screen: AppRoute.HOME,
                            params: { reload: true },
                        });
                } else {
                }
            });
        } catch (e) {
            props.signOut && props.signOut();
        }
    };

    const deleteCamera = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        const { _id } = camera;
        try {
            await deleteCam({ _id, userToken }, res => {
                navigation &&
                    navigation.navigate(AppRoute.HOME, {
                        screen: AppRoute.HOME,
                        params: { reload: true },
                    });
                console.log('res', res);
            });
        } catch (e) {
            props.signOut && props.signOut();
        }
    };

    return (
        <DrawerContentScrollView>
            <DrawerItemList
                state={props.state}
                navigation={props.navigation}
                descriptors={props.descriptors}
                activeBackgroundColor={Colors.purple_blue}
                activeTintColor={Colors.white}
            />

            <DrawerItem
                icon={() => (
                    <Switch onValueChange={async () => await toggleSwitch()} value={isEnabled} />
                )}
                label="Chế độ backup"
                labelStyle={[styles.label, { marginLeft: -12 }]}
            />
            <DrawerItem
                icon={() => <Icon name={'delete'} type={'ant-design'} />}
                label="Xoá camera"
                labelStyle={styles.label}
                onPress={deleteCamera}
            />
        </DrawerContentScrollView>
    );
}
