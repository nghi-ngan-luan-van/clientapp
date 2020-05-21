import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { AuthContext } from '../../navigation/AppNavigator'

function SignIn() {
    const [email, setEmail] = React.useState('nghinguyen.170498@gmail.com');
    const [password, setPassword] = React.useState('123456');

    const { signIn } = React.useContext(AuthContext);
    return (
        <View>
            <View style={styles.logoContiner}>
                <Image style={styles.logo}
                    source={require('../../assets/logo.png')} />
            </View>
            <View style={styles.container}>

                <Text style={styles.welcome}>WELCOME</Text>
                <View style={{ height: 30 }} />

                <View style={styles.emailContainer}>
                    <TextInput style={styles.textInput}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address" />
                </View>
                <View style={styles.passwordContainer}>
                    <TextInput style={styles.textInput}
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Password"
                        secureTextEntry={true} />
                </View>

                <TouchableOpacity style={styles.button}
                    onPress={() => signIn({ email: email.toLowerCase(), password })}
                >
                    <Text style={{ fontWeight: 'bold', color: 'white' }}>SIGN IN</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}

module.exports = SignIn;
const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 1,
        paddingTop: 50
    },
    logo: {
        alignSelf: 'center',
        width: 300,
        height: 60,
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
    },
    button: {
        width: 325,
        borderColor: '#129793',
        borderWidth: 1,
        height: 50,
        padding: 10,
        borderRadius: 24,
        marginTop: 20,
        backgroundColor: '#129793',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#129793',
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowRadius: 5,
        shadowOpacity: 0.8
    },
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