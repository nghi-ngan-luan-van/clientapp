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
GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
    webClientId: '136433114251-7q32fbspm54bn75bmug0et0v8abth5nj.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    hostedDomain: '', // specifies a hosted domain restriction
    loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
    forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
    accountName: '', // [Android] specifies an account name on the device that should be used
    iosClientId: '136433114251-j2rjq3fkgq0r8v014pdtr660n4vbe4ov.apps.googleusercontent.com', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
});

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
