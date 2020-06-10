import React from 'react';
import {Dimensions, Image, StyleSheet, Text, TouchableOpacity, View, TextInput,Alert} from 'react-native';
import {AuthContext} from '../../navigation/AppNavigator'
import {AppRoute} from "../../navigation/app-routes";

const BACKGROUND = require('../../assets/Illustration.png')
const {width, height} = Dimensions.get('window')
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-community/google-signin';
GoogleSignin.configure();
export function SignInForm() {
    const [email, setEmail] = React.useState('nghinguyen.170498@gmail.com');
    const [password, setPassword] = React.useState('123456');

    const {signIn} = React.useContext(AuthContext);
    return (
        <View style={styles.container}>
            <Text style={styles.welcome}>WELCOME</Text>
            <View style={{height: 30}}/>

            <View style={styles.emailContainer}>
                <TextInput style={styles.textInput}
                           placeholder="Email"
                           value={email}
                           onChangeText={setEmail}
                           keyboardType="email-address"/>
            </View>
            <View style={styles.passwordContainer}>
                <TextInput style={styles.textInput}
                           value={password}
                           onChangeText={setPassword}
                           placeholder="Password"
                           secureTextEntry={true}/>
            </View>

            <TouchableOpacity style={[styles.button,{marginTop:32, width: width -48}]}
                              onPress={() => signIn({email: email.toLowerCase(), password})}
            >
                <Text style={{fontWeight: 'bold', color: 'white'}}>SIGN IN</Text>
            </TouchableOpacity>
        </View>
    )
}

export function SignIn(props) {
    const [email, setEmail] = React.useState('nghinguyen.170498@gmail.com');
    const [password, setPassword] = React.useState('123456');
    const [userInfo, setUserInfo] = React.useState('123456');
    const [error, setError] = React.useState(null);

    const {signIn} = React.useContext(AuthContext);

    const _signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            setUserInfo( userInfo);
        } catch (error) {
            switch (error.code) {
                case statusCodes.SIGN_IN_CANCELLED:
                    // sign in was cancelled
                    Alert.alert('cancelled');
                    break;
                case statusCodes.IN_PROGRESS:
                    // operation (eg. sign in) already in progress
                    Alert.alert('in progress');
                    break;
                case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
                    // android only
                    Alert.alert('play services not available or outdated');
                    break;
                default:
                    Alert.alert('Something went wrong', error.toString());
                    setError({
                        error,
                    });
            }
        }
    };

    const onPressSignIn = ()=>{
        let {navigation} = props;
        navigation && navigation.navigate(AppRoute.SIGN_IN_FORM);
    }
    return (
        <View style={styles.container}>
            <Image style={styles.background}
                   source={BACKGROUND}/>
            <Text style={{
                color: '#7B7F9E',
                flex: 1,
                width: width * 0.5,
                marginLeft: 18,
                fontSize: 15,
                textAlign: 'left',
                alignSelf: 'flex-start'
            }}>this is app qwertyubgabasjhfbskjdfaskjfhajdgflajdgbaljkfbasdljkfbaslhjiosdfghjcvbcvbnvb</Text>
            <View style={[styles.row, {width, paddingHorizontal: 12}]}>
                <TouchableOpacity style={[styles.button, {backgroundColor: '#fff', borderWidth: 0.3}]}>
                    <Image source={require('../../assets/ic_cloud_left.png')} style={styles.icon}/>
                    <Text style={{color: '#567DF4'}}>SignUp</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button]} onPress={onPressSignIn}>
                    <Text style={{color: '#fff'}}>SignIn</Text>
                    <Image source={require('../../assets/ic_next.png')} style={styles.icon}/>
                </TouchableOpacity>

            </View>
            <GoogleSigninButton
                style={{ width: 192, height: 48 }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={_signIn}
                // disabled={this.state.isSigninInProgress}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#fff',
        padding: 12,
    },
    background: {
        top: 0,
        width,
        resizeMode: 'contain',
        // height: height * 0.4,

    },
    row: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: '#fff',
        alignContent: 'space-between'

    },
    button: {
        // flex:1,
        backgroundColor: '#567DF4',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        padding: 6,
        height: 50,
        width: 150
    },
    icon: {
        alignSelf: 'center',
        width: 30,
        height: 12,
        resizeMode: 'contain',
    },
    forgotPassword: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
        height: 30,
        alignItems: 'flex-end',
    },
    createAccount: {
        height: 30,
    },
    normalContainer: {
        // height: 20,
        fontSize: 14
    },
    normalText: {
        color: '#5B5A5A',
        fontSize: 12,
        alignItems: 'center',
        textAlign: 'center',
        width: 330,
    },
    createText: {
        color: '#FF7260',
        fontSize: 12,
        alignItems: 'center',
        textAlign: 'center',
        width: 330,
    },
    forgotText: {
        color: '#5B5A5A',
        fontSize: 12,
        alignItems: 'flex-end',
        textAlign: 'right',
        width: 330,
    },
    logoContiner: {
        height: 170,
        flexDirection: 'column',
        justifyContent: 'flex-end',
    },
    welcome: {
        fontSize: 25,
        color: '#5B5A5A',
        letterSpacing: 6
    },
    textInput: {
        color: '#989899',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 14,
        padding:6
    },
    // button: {
    //     width: 325,
    //     borderColor: '#129793',
    //     borderWidth: 1,
    //     height: 50,
    //     padding: 10,
    //     borderRadius: 24,
    //     marginTop: 20,
    //     backgroundColor: '#129793',
    //     flexDirection: 'column',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     shadowColor: '#129793',
    //     shadowOffset: {
    //         width: 0,
    //         height: 4
    //     },
    //     shadowRadius: 5,
    //     shadowOpacity: 0.8
    // },
    buttonText: {
        color: 'white',
        fontSize: 12
    },
    emailContainer: {
        width: 325,
        borderColor: '#CFD0D1',
        borderWidth: 1,
        height: 50,
        // padding: 10,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderBottomWidth: 0,
        backgroundColor: '#F5F6F7'
    },
    passwordContainer: {
        width: 325,
        borderColor: '#CFD0D1',
        borderWidth: 1,
        height: 50,
        // padding: 10,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
        backgroundColor: '#F5F6F7'

    }

});