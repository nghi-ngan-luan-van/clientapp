import React, { useState } from 'react';
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
import { AppRoute } from '../../navigation/app-routes';

const { width, height } = Dimensions.get('window');
import { Button } from 'react-native-elements';
import { Colors } from '../../utils/AppConfig';

import { useSafeArea } from 'react-native-safe-area-context';
import { EmailForm, ConfirmTokenForm } from './ResetPasswordForm';
// {
//     "token":"SbJFPAV",
//     "newPassword":"123456"
// }
export function ResetPassword(props) {
    const insets = useSafeArea();
    const [isEmailVailid, setValidEmail] = useState(false);
    const submitEmail = () => {
        setValidEmail(true);
    };
    return (
        <ScrollView
            style={{ flex: 1, backgroundColor: Colors.purple_blue }}
            contentContainerStyle={[styles.contentContainer, { paddingBottom: insets.bottom }]}
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

            <EmailForm
                {...props}
                style={{
                    marginTop: insets.top,
                }}
                onSubmit={submitEmail}
            />
            {!!isEmailVailid && (
                <ConfirmTokenForm
                    {...props}
                    style={{
                        marginTop: -height * 0.15,
                    }}
                />
            )}
            <View style={styles.registerContainer}>
                <Text style={styles.textRegister}>Chưa có tài khoản?</Text>
                <Button
                    title={'Đăng ký ngay!'}
                    type="solid"
                    titleStyle={styles.regTitle}
                    buttonStyle={styles.button}
                    onPress={() => {
                        const { navigation } = props || {};
                        navigation && navigation.navigate(AppRoute.SIGN_UP);
                    }}
                />
            </View>
            <Button
                title={'Quay về đăng nhập.'}
                type="outline"
                titleStyle={styles.signInTitle}
                buttonStyle={styles.signInButton}
                onPress={() => {
                    const { navigation } = props || {};
                    navigation && navigation.navigate(AppRoute.SIGN_IN);
                }}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    contentContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    topView: {
        width,
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: Colors.purple_blue,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
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
        marginTop: 12,
        fontWeight: 'bold',
        color: Colors.brandy_rose,
    },
    button: {
        backgroundColor: Colors.screen,
        padding: 12,
        marginLeft: 6,
        borderRadius: 12,
    },
    registerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 12,
    },
    regTitle: {
        fontSize: 14,
        color: Colors.pomegranate,
        fontWeight: 'bold',
    },
    textRegister: { fontSize: 14, color: Colors.whisper, fontWeight: 'bold' },
    signInButton: { borderRadius: 24, borderColor: Colors.screen },
    signInTitle: { color: Colors.white },
});
