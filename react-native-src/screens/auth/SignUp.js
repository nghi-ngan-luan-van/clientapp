import React from 'react';
import {
    Dimensions,
    Image,
    Keyboard,
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { AuthContext } from '../../navigation/context';
import { AppRoute } from '../../navigation/app-routes';

const { width, height } = Dimensions.get('window');
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-community/google-signin';
import { Button, Input } from 'react-native-elements';
import { Colors } from '../../utils/AppConfig';
GoogleSignin.configure();

import { useSafeArea } from 'react-native-safe-area-context';
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';

export default function SignUp(props) {
    const insets = useSafeArea();
    return (
        <ScrollView
            style={{ flex: 1, backgroundColor: Colors.screen }}
            contentContainerStyle={styles.contentContainer}
        >
            <View style={[styles.topView, { paddingTop: insets.top }]}>
                <View style={styles.gif}>
                    <Image
                        style={styles.backgroundImg}
                        source={require('../../assets/camera.gif')}
                    />
                </View>
                <Text style={styles.appname}>C L O M E R A</Text>
            </View>

            <SignUpForm
                {...props}
                style={{
                    marginTop: -(insets.top + 80),
                }}
            />
            <Button
                title={'Đã có tài khoản? Quay về đăng nhập.'}
                type="outline"
                titleStyle={{ color: Colors.arapawa, fontSize: 16 }}
                buttonStyle={{ borderRadius: 24, borderWidth: 0 }}
                onPress={() => {
                    const { navigation } = props || {};
                    navigation && navigation.navigate(AppRoute.SIGN_IN);
                }}
            />
        </ScrollView>
    );
    // return (
    // <KeyboardAvoidingView style={{ flex: 1 }}>
    //     <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    //         <View style={[styles.contentContainer, { paddingBottom: insets.bottom }]}>
    //             <View style={[styles.topView, { paddingTop: insets.top }]}>
    //                 <Image
    //                     style={{ height: 180, width: 180, borderRadius: 90 }}
    //                     source={require('../../assets/camera.gif')}
    //                 />
    //                 <Text style={styles.appname}>C L O M E R A</Text>
    //                 {/*<Text style={styles.screenName}>ĐĂNG KÝ TÀI KHOẢN</Text>*/}
    //             </View>
    //
    //             <SignUpForm
    //                 {...props}
    //                 style={{
    //                     marginTop: -height / 6,
    //                 }}
    //             />
    //             <Button
    //                 title={'Đã có tài khoản? Quay về đăng nhập.'}
    //                 type="outline"
    //                 titleStyle={{ color: Colors.arapawa }}
    //                 buttonStyle={{ borderRadius: 24, borderWidth: 0 }}
    //                 onPress={() => {
    //                     const { navigation } = props || {};
    //                     navigation && navigation.navigate(AppRoute.SIGN_IN);
    //                 }}
    //             />
    //         </View>
    //     </TouchableWithoutFeedback>
    // </KeyboardAvoidingView>
    // );
}

const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
    },
    shadow: {
        shadowOffset: { width: 10, height: 10 },
        shadowColor: Colors.arapawa,
        shadowOpacity: 0.4,
        elevation: 5,
    },
    appname: {
        fontSize: 30,
        marginTop: 15,
        fontWeight: 'bold',
        color: Colors.brandy_rose,
    },
    screenName: {
        fontSize: 20,
        marginTop: 20,
        fontWeight: 'bold',
        color: Colors.violet,
    },
    contentContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.screen,
    },
    topView: {
        width,
        height: height * 0.55,
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: Colors.purple_blue,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
    },
    bottomView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundImg: {
        height: 180,
        width: 180,
        borderRadius: 90,
        // resizeMode: 'contain',
        overlayColor: 'transparent',
    },
    gif: {
        width: 180,
        height: 180,
        borderRadius: 90,
        overlayColor: '#fff',
        overflow: 'hidden',
        marginTop: 10,
    },

    textBold: { fontSize: 14, color: Colors.violet, fontWeight: 'bold' },
});
