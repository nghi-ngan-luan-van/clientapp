import React from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { Colors } from '../../utils/AppConfig';
import { AppRoute } from '../../navigation/app-routes';
import { signUp } from '../../utils/ApiUtils';
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'space-around',
    },
    boxContainer: {
        width: width - 48,
        padding: 7,
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
        // flex: 1,
        marginVertical: 12,
        backgroundColor: Colors.purple_blue,
        width: '100%',
        paddingVertical: 14,
        borderRadius: 40,
    },
});

export default function SignUpForm(props) {
    const [email, setEmail] = React.useState('nn170498@gmail.com');
    const [password, setPassword] = React.useState('123456');
    const [name, setName] = React.useState('nghi nguyen2');

    const _signUp = async () => {
        const _email = email.toLowerCase().trim();
        const _name = name.toLowerCase().trim();
        signUp({ name: _name, email: _email, password: password }, response => {
            console.log(response);
            if (!response) {
                alert('Người dùng đã tồn tại');
            } else {
                alert('Đăng kí thành công');
                const { navigation } = props || {};
                navigation && navigation.navigate(AppRoute.SIGN_IN);
            }
        });
    };

    return (
        <View style={[styles.container, props.style]}>
            <View style={[styles.boxContainer]}>
                <Input
                    placeholder="Nhập email của bạn"
                    label={'Email'}
                    labelStyle={styles.text}
                    value={email}
                    inputStyle={styles.text}
                    onChangeText={value => setEmail(value)}
                    keyboardType="email-address"
                    // errorMessage={'Vui lòng nhập email'}
                />
                <Input
                    placeholder="Nhập tên của bạn"
                    label={'Tên'}
                    labelStyle={styles.text}
                    value={name}
                    inputStyle={styles.text}
                    onChangeText={value => setName(value)}
                />
                <Input
                    placeholder="Nhập mật khẩu của bạn"
                    label={'Mật khẩu'}
                    labelStyle={{ color: Colors.grey }}
                    secureTextEntry={true}
                    value={password}
                    inputStyle={styles.text}
                    onChangeText={value => setPassword(value)}
                />
            </View>
            <Button title={'Đăng ký'} buttonStyle={styles.button} onPress={_signUp} />
        </View>
    );
}
