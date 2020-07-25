import React from 'react';
import { AuthContext } from '../../navigation/AppNavigator';
import { StyleSheet, Dimensions, Text, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { Colors } from '../../utils/AppConfig';
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
    viewContainer: {
        flex: 1,
        justifyContent: 'space-around',
        alignContent: 'center',
        alignItems: 'center',
    },
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

export default function SignInForm(props) {
    const [email, setEmail] = React.useState('nghinguyen.170498@gmail.com');
    const [password, setPassword] = React.useState('123456');
    const [isSigninInProgress, setSigninInProgress] = React.useState(false);
    const [userInfo, setUserInfo] = React.useState();
    const { signIn, googleSignIn } = React.useContext(AuthContext);
    const ggSignIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            setUserInfo({ userInfo });
            googleSignIn({ userInfo });
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                setSigninInProgress(true);
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
    };

    return (
        <View style={[styles.viewContainer, props.style]}>
            <View>
                <View style={[styles.container]}>
                    <Input
                        placeholder="Nhập email của bạn"
                        leftIcon={{
                            type: 'font-awesome',
                            name: 'envelope',
                            color: Colors.brandy_rose,
                            size: 30,
                        }}
                        label={'Email'}
                        labelStyle={styles.text}
                        // style={styles}
                        leftIconContainerStyle={styles.leftIconContainer}
                        value={email}
                        inputStyle={styles.text}
                        onChangeText={value => setEmail(value)}
                        keyboardType="email-address"
                        // errorMessage={'Vui lòng nhập email'}
                    />

                    <Input
                        placeholder="Nhập mật khẩu của bạn"
                        leftIcon={{
                            type: 'font-awesome',
                            name: 'lock',
                            color: Colors.brandy_rose,
                            size: 30,
                        }}
                        leftIconContainerStyle={styles.leftIconContainer}
                        label={'Mật khẩu'}
                        labelStyle={{ color: Colors.grey }}
                        secureTextEntry={true}
                        // errorMessage={'Vui lòng nhập mật khẩu'}
                        // style={styles}
                        value={password}
                        inputStyle={styles.text}
                        // inputContainerStyle={styles.input}
                        onChangeText={value => setPassword(value)}
                    />
                </View>
                <Button
                    title={'Quên mật khẩu'}
                    type="outline"
                    titleStyle={{ color: Colors.violet, fontSize: 14 }}
                    buttonStyle={{ width: '50%', borderWidth: 0, alignSelf: 'flex-end' }}
                    onPress={() => {
                        const { navigation } = props || {};
                        navigation && navigation.navigate(AppRoute.RESET_PASSWORD);
                    }}
                />
            </View>

            <Button
                title={'Đăng nhập'}
                buttonStyle={styles.button}
                onPress={() => {
                    signIn({ email, password });
                }}
            />
            <View style={styles.row}>
                <Text style={{ color: Colors.brandy_rose, alignSelf: 'center', fontSize: 18 }}>
                    Hoặc đăng nhập với
                </Text>
                <GoogleSigninButton
                    style={{ width: 48, height: 48 }}
                    size={GoogleSigninButton.Size.Icon}
                    color={GoogleSigninButton.Color.Light}
                    onPress={ggSignIn}
                    disabled={isSigninInProgress}
                />
            </View>
        </View>
    );
}
