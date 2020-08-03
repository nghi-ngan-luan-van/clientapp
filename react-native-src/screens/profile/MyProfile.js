import React, { useContext, useEffect, useState } from 'react';
import { Text, View, SafeAreaView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../utils/AppConfig';
import { Icon } from 'react-native-elements';
import { AppRoute } from '../../navigation/app-routes';
import { AuthContext } from '../../navigation/AppNavigator';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeArea } from 'react-native-safe-area-context';
import { verifytoken } from '../../utils/ApiUtils';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/core';
import { getHeaderTitle } from '../../navigation/HomeNavigator';

const styles = StyleSheet.create({
    safeContainer: {
        backgroundColor: Colors.screen,
        flex: 1,
    },
    container: {
        flex: 1,
        // padding: 12,
    },
    avatar: {
        height: 64,
        width: 64,
    },
    avatarrow: {
        // flex: 1,
        flexDirection: 'row',
        padding: 12,
        alignItems: 'center',
        // justifyContent:''
        backgroundColor: Colors.white,
        // height: 60,
    },
    nameRow: {
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        // alignItems: 'center',
        // alignSelf: 'center',
        // marginLeft: 6,
        // paddingTop: 3,
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        backgroundColor: Colors.white,
        alignItems: 'center',
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12,
        padding: 10,
        marginTop: 12,
        marginLeft: 12,
    },
    icon: {
        height: 30,
        width: 30,
    },
    text: {
        flex: 1,
        fontSize: 16,
        color: Colors.black,
        marginLeft: 12,
    },
    title: {
        flex: 1.5,
        fontSize: 20,
        color: Colors.arapawa,
        fontWeight: 'bold',
        marginLeft: 12,
        justifyContent: 'center',
    },
});
export default function MyProfile(props) {
    const insets = useSafeArea();
    const { signOut } = useContext(AuthContext);
    const [user, setUser] = useState({});
    const { navigation } = props;
    useFocusEffect(() => {
        navigation &&
            navigation.setOptions({
                header: <View style={{ backgroundColor: 'red' }} />,
                // headerTitle: getHeaderTitle(route),
                headerTitleStyle: { color: 'white' },
                // headerStyle: { backgroundColor: Colors.screen },
                headerBackTitleStyle: { color: Colors.purple_blue, fontSize: 19 },
                // headerBackImage:,
                headerBackImage: () => (
                    <Icon
                        type={'antdesin'}
                        // type={'antdesign'}
                        name={'chevron-left'}
                        color={Colors.purple_blue}
                        style={{ marginHorizontal: 12 }}
                    />
                ),
            });
    });
    useEffect(() => {
        const submitChangePass = result => {
            if (!result) {
                signOut();
            }
            console.log(result);
            setUser(result);
        };
        const getUser = async callback => {
            let userToken = await AsyncStorage.getItem('userToken');
            try {
                await verifytoken({ token: userToken }, callback);
                console.log('Sent successfully');
            } catch (error) {
                signOut();
                console.log(error);
            }
        };
        getUser(submitChangePass);
    }, []);

    const goChangePass = () => {
        const { navigation } = props;
        navigation && navigation.push(AppRoute.CHANGE_PASS, { user: user });
    };

    return (
        <SafeAreaView style={styles.safeContainer}>
            <LinearGradient
                style={styles.container}
                colors={[Colors.white, Colors.screen]}
                start={{ x: 1, y: 1 }}
                end={{ x: 0, y: 0 }}
            >
                <View>
                    <View style={styles.avatarrow}>
                        <Image source={require('../../assets/ic_user.png')} style={styles.avatar} />
                        <View style={styles.nameRow}>
                            <Text style={styles.title}>{user && user.name}</Text>
                            <Text numberOfLines={2} style={styles.text}>
                                email: {user && user.email}
                            </Text>
                        </View>
                        <Icon
                            type="antdesign"
                            name="edit"
                            color={Colors.arapawa}
                            onPress={() => {}}
                            hitSlop={{}}
                        />
                    </View>
                    <TouchableOpacity style={styles.row} onPress={goChangePass}>
                        <Image source={require('../../assets/ic_lock.png')} style={styles.icon} />
                        <Text style={styles.text}>Đổi mật khẩu</Text>
                        <Icon type="antdesign" name="right" color={Colors.arapawa} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.row} onPress={signOut}>
                        <Image source={require('../../assets/ic_logout.png')} style={styles.icon} />
                        <Text style={styles.text}>Đăng xuất</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </SafeAreaView>
    );
}
