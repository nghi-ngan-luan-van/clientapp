import React from 'react';
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
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-community/google-signin';
import { Button, Input } from 'react-native-elements';
import { Colors } from '../../utils/AppConfig';
GoogleSignin.configure();

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
                            style={{ height: 180, width: 180, borderRadius: 90 }}
                            source={require('../../assets/camera.gif')}
                        />
                        <Text
                            style={{
                                fontSize: 40,
                                marginTop: 20,
                                fontWeight: 'bold',
                                color: Colors.brandy_rose,
                            }}
                        >
                            C L O M E R A
                        </Text>
                    </View>

                    <SignInForm
                        {...props}
                        style={{
                            marginTop: -height / 8,
                        }}
                    />
                    <Button
                        title={'Bạn chưa có tài khoản? Đăng kí'}
                        type="outline"
                        titleStyle={{ color: Colors.brandy_rose }}
                        buttonStyle={{ borderRadius: 24, borderColor: Colors.screen }}
                        onPress={() => {
                            const { navigation } = props || {};
                            navigation && navigation.push(AppRoute.SIGN_UP);
                        }}
                    />
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
    title: {
        fontWeight: 'bold',
    },
    shadow: {
        shadowOffset: { width: 10, height: 10 },
        shadowColor: Colors.arapawa,
        shadowOpacity: 0.4,
        elevation: 5,
    },
});
