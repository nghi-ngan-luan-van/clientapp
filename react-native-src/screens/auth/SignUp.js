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
import SignUpForm from './SignUpForm';

export default function SignUp(props) {
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
                        <Text style={styles.appname}>C L O M E R A</Text>
                        {/*<Text style={styles.screenName}>ĐĂNG KÝ TÀI KHOẢN</Text>*/}
                    </View>

                    <SignUpForm
                        {...props}
                        style={{
                            marginTop: -height / 6,
                        }}
                    />
                    <Button
                        title={'Đã có tài khoản? Quay về đăng nhập.'}
                        type="outline"
                        titleStyle={{ color: Colors.arapawa }}
                        buttonStyle={{ borderRadius: 24, borderColor: Colors.screen }}
                        onPress={() => {
                            const { navigation } = props || {};
                            navigation && navigation.navigate(AppRoute.SIGN_IN);
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
        backgroundColor: Colors.brandy_rose,
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
    appname: {
        fontSize: 40,
        marginTop: 20,
        fontWeight: 'bold',
        color: Colors.purple_blue,
    },
    screenName: {
        fontSize: 20,
        marginTop: 20,
        fontWeight: 'bold',
        color: Colors.violet,
    },
});
