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
    Image,
} from 'react-native';
import { Button, Input } from 'react-native-elements';
import { Colors } from '../../utils/AppConfig';
import { AppRoute } from '../../navigation/app-routes';
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.whisper,
        alignItems: 'center',
        // justifyContent: 'space-around',
    },
    boxContainer: {
        width: width,
        padding: 7,
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

    text: { color: Colors.grey },
    button: {
        // flex: 1,
        marginVertical: 12,
        // backgroundColor: Colors.purple_blue,
        width: '100%',
        paddingVertical: 14,
        borderRadius: 40,
    },
    alert: {
        // flex: 1,
        fontSize: 14,
        color: Colors.alert,
        padding: 12,
    },
});

export default function ChangePassword(props) {
    const [password, setPassword] = React.useState('');
    const [passwordNew, setPasswordNew] = React.useState('123456');
    const [passwordConfirm, setPasswordConfirm] = React.useState('123456');
    const [alertText, setAlert] = React.useState('');

    const validatePassword = () => {
        if (!password || !passwordNew) {
            setAlert('Mật khẩu không được để trống');
        } else if (passwordNew !== passwordConfirm) {
            setAlert('Mật khẩu mới không khớp');
        } else {
            setAlert('');
        }
    };
    let alert = alertText ? <Text style={styles.alert}>{alertText}</Text> : null;
    const submitChange = () => {
        validatePassword();
        if (!alertText) {
            //call api change password
        }
    };
    return (
        <KeyboardAvoidingView style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={[styles.container, props.style]}>
                    <View style={[styles.boxContainer]}>
                        {alert}
                        <Input
                            placeholder="Nhập mật khẩu của bạn"
                            // leftIcon={{
                            //     type: 'font-awesome',
                            //     name: 'lock',
                            //     color: Colors.brandy_rose,
                            //     size: 30,
                            // }}
                            // leftIconContainerStyle={styles.leftIconContainer}
                            label={'Mật khẩu hiện tại'}
                            labelStyle={{ color: Colors.grey }}
                            secureTextEntry={true}
                            // errorMessage={'Vui lòng nhập mật khẩu'}
                            // style={styles}
                            value={password}
                            inputStyle={styles.text}
                            // inputContainerStyle={styles.input}
                            onChangeText={value => setPassword(value)}
                        />
                        <Input
                            placeholder="Nhập mật khẩu mới"
                            // leftIcon={{
                            //     type: 'font-awesome',
                            //     name: 'lock',
                            //     color: Colors.brandy_rose,
                            //     size: 30,
                            // }}
                            // leftIconContainerStyle={styles.leftIconContainer}
                            label={'Mật khẩu mới'}
                            labelStyle={{ color: Colors.grey }}
                            secureTextEntry={true}
                            // errorMessage={'Vui lòng nhập mật khẩu'}
                            // style={styles}
                            value={passwordNew}
                            inputStyle={styles.text}
                            // inputContainerStyle={styles.input}
                            onChangeText={value => setPasswordNew(value)}
                        />
                        <Input
                            placeholder="Nhập mật khẩu mới"
                            // leftIcon={{
                            //     type: 'font-awesome',
                            //     name: 'lock',
                            //     color: Colors.brandy_rose,
                            //     size: 30,
                            // }}
                            // leftIconContainerStyle={styles.leftIconContainer}
                            label={'Xác nhận mật khẩu mới'}
                            labelStyle={{ color: Colors.grey }}
                            secureTextEntry={true}
                            // errorMessage={'Vui lòng nhập lại mật khẩu'}
                            // style={styles}
                            value={passwordConfirm}
                            inputStyle={styles.text}
                            // inputContainerStyle={styles.input}
                            onChangeText={value => setPasswordConfirm(value)}
                        />
                    </View>
                    <Button
                        title={'Đổi mật khẩu'}
                        buttonStyle={styles.button}
                        onPress={submitChange}
                    />
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
