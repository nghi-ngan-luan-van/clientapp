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
import { Button, Icon, Input } from 'react-native-elements';
import { Colors } from '../../utils/AppConfig';
import { AppRoute } from '../../navigation/app-routes';
import { changePassword } from '../../utils/ApiUtils';
import _ from 'lodash';
import { useSafeArea } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        // alignItems: 'center',
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
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' },
    headerBack: {
        color: Colors.purple_blue,
        fontSize: 16,
    },
    text: { color: Colors.grey },
    button: {
        // flex: 1,
        // margin: 12,
        // backgroundColor: Colors.purple_blue,
        alignSelf: 'center',
        width: '70%',
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
    const insets = useSafeArea();
    const [password, setPassword] = React.useState('123456');
    const [passwordNew, setPasswordNew] = React.useState('1234567');
    const [passwordConfirm, setPasswordConfirm] = React.useState('1234567');
    const [alertText, setAlert] = React.useState('');
    const [user, setUser] = React.useState(_.get(props, 'route.params.user', {}));
    const goBack = () => {
        const { navigation } = props;
        navigation && navigation.canGoBack() && navigation.pop();
    };

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
            changePassword(
                { id: user._id, oldPassword: password, newPassword: passwordNew },
                response => {
                    console.log(response);
                    if (response) {
                        setAlert('Đổi mật khẩu thành công');
                    } else {
                        setAlert('Sai mật khẩu hiện tại. Đổi mật khẩu thất bại');
                    }
                }
            );
        }
    };
    console.log('user', user);
    return (
        <KeyboardAvoidingView style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={[styles.container, props.style, { paddingTop: insets.top }]}>
                    <TouchableOpacity style={styles.header} onPress={() => goBack()}>
                        <Icon
                            type={'antdesin'}
                            name={'chevron-left'}
                            color={Colors.purple_blue}
                            size={40}
                            style={{ alignSelf: 'flex-start' }}
                        />
                        <Text style={styles.headerBack}>Quay về hồ sơ của tôi</Text>
                    </TouchableOpacity>
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
                        <Button
                            title={'Đổi mật khẩu'}
                            buttonStyle={styles.button}
                            onPress={submitChange}
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
