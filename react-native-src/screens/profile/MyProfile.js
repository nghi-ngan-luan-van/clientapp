import React, { useContext, useEffect } from 'react';
import { Text, View, SafeAreaView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../utils/AppConfig';
import { Icon } from 'react-native-elements';
import { AppRoute } from '../../navigation/app-routes';
import { AuthContext } from '../../navigation/AppNavigator';
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
        marginLeft: 6,
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
        fontSize: 14,
        color: Colors.black,
        marginLeft: 6,
    },
    title: {
        flex: 1.5,
        fontSize: 18,
        color: Colors.arapawa,
        fontWeight: 'bold',
        marginLeft: 6,
        justifyContent: 'center',
    },
});
export default function MyProfile(props) {
    const { signOut } = useContext(AuthContext);
    const goChangePass = () => {
        const { navigation } = props;
        navigation && navigation.push(AppRoute.CHANGE_PASS);
    };

    return (
        <SafeAreaView style={styles.safeContainer}>
            <View style={styles.container}>
                <View style={styles.avatarrow}>
                    <Image source={require('../../assets/ic_user.png')} style={styles.avatar} />
                    <View style={styles.nameRow}>
                        <Text style={styles.title}>My Name</Text>
                        <Text numberOfLines={2} style={styles.text}>
                            email:abc@da.com
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
        </SafeAreaView>
    );
}
