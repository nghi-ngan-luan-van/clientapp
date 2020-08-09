import React from 'react';
import { AuthContext } from '../../navigation/AppNavigator';
import { StyleSheet, Dimensions, Text, View, ScrollView } from 'react-native';
import { Button, Icon, Input } from 'react-native-elements';
import { Colors } from '../../utils/AppConfig';
const { width } = Dimensions.get('window');
import { AppRoute } from '../../navigation/app-routes';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-community/google-signin';
import Loader from '../../components/Loader';
GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
    webClientId: '136433114251-o6sboivdtsi146766r9uhnv56dcqprkb.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    hostedDomain: '', // specifies a hosted domain restriction
    loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
    forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
    accountName: '', // [Android] specifies an account name on the device that should be used
    iosClientId: '', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
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
        marginRight: 6,
    },
    text: { color: Colors.grey },
    button: {
        // opacity: 0.95,
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.purple_blue,
        paddingVertical: 16,
        width: width - 48,
        // paddingHorizontal: 50,
        borderRadius: 30,
        marginBottom: 12,
    },
    title: { flex: 1, color: Colors.screen, alignSelf: 'center' },
    row: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        width,
    },
    ggButton: { width: 100, height: 48 },
});

export default function SignInForm(props) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [isSigninInProgress, setSigninInProgress] = React.useState(false);
    const { signIn, googleSignIn } = React.useContext(AuthContext);
    const [loading, setLoading] = React.useState(false);
    const [showPass, setShowPass] = React.useState(false);

    const ggSignIn = async () => {
        setLoading(true);
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            const { idToken = '' } = userInfo;
            googleSignIn({ token: idToken });
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log('SIGN_IN_CANCELLED');
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                setSigninInProgress(true);
                console.log('IN_PROGRESS');

                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log('PLAY_SERVICES_NOT_AVAILABLE');

                // play services not available or outdated
            } else {
                console.log('Error');

                // some other error happened
            }
        }
    };
    const onSignIn = () => {
        setLoading(true);
        signIn({ email, password }, () => setLoading(false));
    };

    return (
        <View style={[styles.viewContainer, props.style]}>
            <Loader loading={loading} />
            <View>
                <View style={[styles.container]}>
                    <Input
                        placeholder="Nhập email của bạn"
                        leftIcon={{
                            type: 'ant-design',
                            name: 'mail',
                            color: Colors.purple_blue,
                            size: 20,
                        }}
                        label={'Email'}
                        labelStyle={styles.text}
                        // style={styles}
                        leftIconContainerStyle={styles.leftIconContainer}
                        value={email}
                        inputStyle={styles.text}
                        onChangeText={value => setEmail(value.toLowerCase().trim())}
                        keyboardType="email-address"
                        // errorMessage={'Vui lòng nhập email'}
                    />

                    <Input
                        placeholder="Nhập mật khẩu của bạn"
                        leftIcon={{
                            type: 'ant-design',
                            name: 'lock',
                            color: Colors.purple_blue,
                            size: 20,
                        }}
                        leftIconContainerStyle={styles.leftIconContainer}
                        rightIcon=<Icon
                            type="font-awesome"
                            name={showPass ? 'eye' : 'eye-slash'}
                            color={Colors.purple_blue}
                            onPress={() => {
                                setShowPass(!showPass);
                            }}
                            hitSlop={{ x: 5, y: 5 }}
                            size={20}
                        />
                        label={'Mật khẩu'}
                        labelStyle={{ color: Colors.grey }}
                        secureTextEntry={!showPass}
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
                title={'ĐĂNG NHẬP'}
                buttonStyle={styles.button}
                onPress={onSignIn}
                titleStyle={styles.title}
            />
            {/*<View style={styles.row}>*/}
            <Text style={{ color: Colors.purple_blue, alignSelf: 'center', fontSize: 18 }}>
                Hoặc đăng nhập với
            </Text>
            <Icon
                name={'google'}
                type={'font-awesome'}
                onPress={ggSignIn}
                reverse
                raised
                color={Colors.purple_blue}
            />
            {/*<GoogleSigninButton*/}
            {/*    style={styles.ggButton}*/}
            {/*    size={GoogleSigninButton.Size.Standard}*/}
            {/*    color={GoogleSigninButton.Color.Dark}*/}
            {/*    onPress={ggSignIn}*/}
            {/*    disabled={isSigninIanProgress}*/}
            {/*/>*/}
            {/*</View>*/}
        </View>
    );
}
