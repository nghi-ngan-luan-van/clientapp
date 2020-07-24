import React from 'react';
import { AuthContext } from '../../navigation/AppNavigator';
import {
    StyleSheet,
    Dimensions,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Keyboard,
} from 'react-native';
import { Button, Icon, Input } from 'react-native-elements';
import { Colors } from '../../utils/AppConfig';
import FirebaseConfig from './config/Firebase/FirebaseConfig';
const { width } = Dimensions.get('window');
import { AppRoute } from '../../navigation/app-routes';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-community/google-signin';
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
const styles = StyleSheet.create({
    container: {
        width: width - 48,
        padding: 12,
        backgroundColor: Colors.white,
        borderRadius: 12,
    },
    leftIconContainer: {
        // width: 60,
        // height: 60,
        // backgroundColor: Colors.whisper,
        // alignItems: 'center',
        // alignContent: 'center',
        // justifyContent: 'center',
        marginEnd: 12,
    },
    // input: {
    //     borderWidth: 0.5,
    //     paddingHorizontal: 12,
    //     // borderStyle: 'dotted',
    //     borderRadius: 10,
    //     borderColor: Colors.grey,
    //     // dash
    // },
    text: { color: Colors.grey },
    button: {
        backgroundColor: Colors.brandy_rose,
        paddingVertical: 16,
        paddingHorizontal: 50,
        borderRadius: 12,
        marginBottom: 12,
    },
    row: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        width,
        // paddingHorizontal: 48,
    },
});

export default function ResetPasswordForm(props) {
    const [email, setEmail] = React.useState('ngankieu.itus@gmail.com');
    console.log('[ResetPasswordForm]');
    const submitEmail = async () => {
        console.log('ResetPasswordForm');
        try {
            await FirebaseConfig.passwordReset(email);

            console.log('Password reset email sent successfully');
        } catch (error) {
            console.log(error);
            // actions.setFieldError('general', error.message)
        }
    };
    return (
        <View
            style={[
                {
                    flex: 1,
                    justifyContent: 'space-around',
                    alignContent: 'center',
                    alignItems: 'center',
                },
                props.style,
            ]}
        >
            <View>
                <View style={[styles.container]}>
                    <Button
                        title={'Quên mật khẩu'}
                        type="outline"
                        titleStyle={{ color: Colors.brandy_rose, fontSize: 24 }}
                        buttonStyle={{ width: '100%', borderWidth: 0, alignSelf: 'center' }}
                        disabled={true}
                    />
                    <Input
                        placeholder="Nhập email của bạn"
                        label={'Email'}
                        labelStyle={styles.text}
                        // style={styles}
                        leftIconContainerStyle={styles.leftIconContainer}
                        value={email}
                        inputStyle={styles.text}
                        onChangeText={value => setEmail(value)}
                        keyboardType="email-address"
                        ri
                        // errorMessage={'Vui lòng nhập email'}
                    />
                    <Icon
                        type="font-awesome"
                        name="arrow-right"
                        // raised
                        onPress={() => submitEmail()}
                        style={{ alignSelf: 'flex-end', marginRight: 12 }}
                    />
                </View>
            </View>
        </View>
    );
}
