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
import { Button, Icon, Input } from 'react-native-elements';
import { Colors } from '../../utils/AppConfig';
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
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

export default function ResetPasswordForm(props) {
    const [email, setEmail] = React.useState('ngankieu.itus@gmail.com');
    console.log('[ResetPasswordForm]');
    const submitEmail = async () => {
        console.log('ResetPasswordForm');
        try {
            // await FirebaseConfig.passwordReset(email);

            console.log('Password reset email sent successfully');
        } catch (error) {
            console.log(error);
            // actions.setFieldError('general', error.message)
        }
    };
    return (
        <View
            style={[
                {
                    flex: 1,
                    justifyContent: 'space-around',
                    alignContent: 'center',
                    alignItems: 'center',
                },
                props.style,
            ]}
        >
            <View>
                <View style={[styles.container]}>
                    <Button
                        title={'Quên mật khẩu'}
                        type="outline"
                        titleStyle={{ color: Colors.brandy_rose, fontSize: 24 }}
                        buttonStyle={{ width: '100%', borderWidth: 0, alignSelf: 'center' }}
                        disabled={true}
                    />
                    <Input
                        placeholder="Nhập email của bạn"
                        label={'Email'}
                        labelStyle={styles.text}
                        // style={styles}
                        leftIconContainerStyle={styles.leftIconContainer}
                        value={email}
                        inputStyle={styles.text}
                        onChangeText={value => setEmail(value)}
                        keyboardType="email-address"
                        ri
                        // errorMessage={'Vui lòng nhập email'}
                    />
                    <Icon
                        type="font-awesome"
                        name="arrow-right"
                        // raised
                        onPress={() => submitEmail()}
                        style={{ alignSelf: 'flex-end', marginRight: 12 }}
                    />
                </View>
            </View>
        </View>
    );
}
