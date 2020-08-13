import React from 'react';
import { AuthContext } from '../../navigation/context';
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
import config from './config/config.json';
GoogleSignin.configure(config);
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
    const [email, setEmail] = React.useState('nghinguyen.170498@gmail.com');
    const [password, setPassword] = React.useState('123456');
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

            googleSignIn({ token: idToken }, () => setLoading(false));
        } catch (error) {
            setLoading(false);
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

        signIn({ email: email.toLowerCase().trim(), password }, () => setLoading(false));
    };

    return (
        <View style={[styles.viewContainer, props.style]}>
            <Loader loading={loading} />
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
                    onChangeText={value => {
                        // let newVal = value.toLowerCase();
                        setEmail(value);
                    }}
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
                    value={password}
                    inputStyle={styles.text}
                    inputContainerStyle={styles.input}
                    onChangeText={value => setPassword(value)}
                />
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    width: width - 48,
                    justifyContent: 'space-between',
                    // backgroundColor: 'red',
                }}
            >
                <Button
                    title={'Quên mật khẩu'}
                    type="outline"
                    titleStyle={{ color: Colors.violet, fontSize: 14 }}
                    buttonStyle={{ borderWidth: 0, alignSelf: 'flex-end' }}
                    onPress={() => {
                        const { navigation } = props || {};
                        navigation && navigation.navigate(AppRoute.RESET_PASSWORD);
                    }}
                />
                <Button
                    title={' Đăng ký'}
                    type="outline"
                    titleStyle={{
                        alignItems: 'center',
                        fontSize: 14,
                        color: Colors.brandy_rose,
                        fontWeight: 'bold',
                    }}
                    buttonStyle={{ borderColor: Colors.screen }}
                    onPress={() => {
                        const { navigation } = props || {};
                        navigation && navigation.navigate(AppRoute.SIGN_UP);
                    }}
                />
            </View>

            <Button
                title={'ĐĂNG NHẬP'}
                buttonStyle={styles.button}
                onPress={onSignIn}
                titleStyle={styles.title}
            />
            <Text style={{ color: Colors.purple_blue, alignSelf: 'center', fontSize: 16 }}>
                Hoặc đăng nhập với
            </Text>
            <Icon
                name={'google'}
                type={'font-awesome'}
                onPress={ggSignIn}
                reverse
                raised
                color={Colors.purple_blue}
                disabled={isSigninInProgress}
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
