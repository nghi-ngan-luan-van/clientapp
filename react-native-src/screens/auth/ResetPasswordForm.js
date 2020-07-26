import React from 'react';
import { AuthContext } from '../../navigation/AppNavigator';
import { StyleSheet, Dimensions, View } from 'react-native';
import { Button, Icon, Input } from 'react-native-elements';
import { Colors } from '../../utils/AppConfig';
import { resetPassword } from '../../utils/ApiUtils';
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        width: width - 48,
        padding: 12,
        backgroundColor: Colors.white,
        borderRadius: 12,
    },
    leftIconContainer: {
        marginEnd: 12,
    },

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
    const onSubmit = result => {
        if (!result) {
        }
    };
    const submitEmail = async () => {
        try {
            await resetPassword({ email }, onSubmit);
            console.log('Password reset email sent successfully');
        } catch (error) {
            console.log(error);
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
                        title={'Đặt lại mật khẩu'}
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
