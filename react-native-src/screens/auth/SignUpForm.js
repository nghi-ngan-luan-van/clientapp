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
import { signUp } from '../../utils/ApiUtils';
import { AppRoute } from '../../navigation/app-routes';
import {HOST_URL} from "../../utils/AppConst";

const styles = StyleSheet.create({
    container: {
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
        backgroundColor: Colors.brandy_rose,
        paddingVertical: 8,
        paddingHorizontal: 30,
        borderRadius: 40,
    },
});

export default function SignUpForm(props) {
    const [email, setEmail] = React.useState('nn170498@gmail.com');
    const [password, setPassword] = React.useState('123456');
    const [name, setName] = React.useState('nghi nguyen2');
    console.log('props signup',props)
    //const { signIn } = React.useContext(AuthContext);
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
                    placeholder="Nhập tên của bạn"
                    leftIcon={{
                        type: 'font-awesome',
                        name: 'envelope',
                        color: Colors.brandy_rose,
                        size: 30,
                    }}
                    label={'Name'}
                    labelStyle={styles.text}
                    // style={styles}
                    leftIconContainerStyle={styles.leftIconContainer}
                    value={name}
                    inputStyle={styles.text}
                    onChangeText={value => setName(value)}
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
                title={'Đăng kí'}
                buttonStyle={styles.button}
                onPress={async() => {
                    let myHeaders = new Headers();
                    myHeaders.append("Content-Type", "application/json");
                    
                    let raw = JSON.stringify({"name":name,"email":email,"password":password});
                    
                    let requestOptions = {
                      method: 'POST',
                      headers: myHeaders,
                      body: raw,
                      redirect: 'follow'
                    };
                    
                    await fetch("http://128.199.211.44/auth/register", requestOptions)                     
                    .then(response => {
                        console.log(response)
                        if (response.status !== 204) {
                            alert('Người dùng đã tồn tại');
                        } else {
                            alert('Đăng kí thành công');
                        }
                    })
                    const { navigation } = props || {};
                    navigation && navigation.push(AppRoute.SIGN_IN)
                }}
            />
        </View>
    );
}
