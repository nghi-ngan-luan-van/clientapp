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
import { Button, Input } from 'react-native-elements';
import { Colors } from '../../utils/AppConfig';
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        width: width - 48,
        padding: 12,
        backgroundColor: Colors.whisper,
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
        borderRadius: 40,
    },
});

export default function SignInForm(props) {
    const [email, setEmail] = React.useState('nghinguyen.170498@gmail.com');
    const [password, setPassword] = React.useState('123456');

    const { signIn } = React.useContext(AuthContext);
    return (
        <View style={[{ flex: 1, justifyContent: 'space-between' }, props.style]}>
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
                title={'Đăng nhập'}
                buttonStyle={styles.button}
                onPress={() => {
                    signIn({ email, password });
                }}
            />
        </View>
    );
}
