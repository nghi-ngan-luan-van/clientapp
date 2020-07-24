import React, { useState } from 'react';
import {
    Dimensions,
    Image,
    Keyboard,
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { AuthContext } from '../../navigation/AppNavigator';
import { AppRoute } from '../../navigation/app-routes';

const BACKGROUND = require('../../assets/background_image.png');
const { width, height } = Dimensions.get('window');
import { Button, Input } from 'react-native-elements';
import { Colors } from '../../utils/AppConfig';

import { useSafeArea } from 'react-native-safe-area-context';
import SignInForm from './SignInForm';

export default function SignIn(props) {
    const insets = useSafeArea();

    return (
        <KeyboardAvoidingView style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={[styles.contentContainer, { paddingBottom: insets.bottom }]}>
                    <View style={[styles.topView, { paddingTop: insets.top }]}>
                        <Image
                            style={styles.backgroundImg}
                            source={require('../../assets/camera.gif')}
                        />
                        <Text style={styles.appname}>C L O M E R A</Text>
                    </View>

                    <SignInForm
                        {...props}
                        style={{
                            marginTop: -height / 6,
                        }}
                    />
                    <View
                        style={{
                            // flex: 0.5,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Text style={{ fontSize: 14, color: Colors.violet, fontWeight: 'bold' }}>
                            Chưa có tài khoản?
                        </Text>
                        <Button
                            title={' Đăng ký!'}
                            type="outline"
                            titleStyle={{
                                fontSize: 14,
                                color: Colors.pomegranate,
                                fontWeight: 'bold',
                            }}
                            buttonStyle={{ borderColor: Colors.screen }}
                            onPress={() => {
                                const { navigation } = props || {};
                                navigation && navigation.navigate(AppRoute.SIGN_UP);
                            }}
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.screen,
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
        fontSize: 40,
        marginTop: 20,
        fontWeight: 'bold',
        color: Colors.brandy_rose,
    },
});
