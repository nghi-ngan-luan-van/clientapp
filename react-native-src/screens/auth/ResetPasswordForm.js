import React from 'react';
import { AuthContext } from '../../navigation/context';
import { StyleSheet, Dimensions, View } from 'react-native';
import { Button, Icon, Input } from 'react-native-elements';
import { Colors } from '../../utils/AppConfig';
import { resetPassword } from '../../utils/ApiUtils';
import { AppRoute } from '../../navigation/app-routes';
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    wrapper: {
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
    navigationRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: { color: Colors.brandy_rose, fontSize: 20 },
    buttonTitle: { width: '100%', borderWidth: 0, alignSelf: 'center' },
    icon: { alignSelf: 'flex-end', marginRight: 12 },
});

export function ResetForm(props) {
    const {
        title,
        label = 'Email',
        submit,
        style,
        placeholder,
        showBack = false,
        navigation,
    } = props;
    const [inputValue, setInputValue] = React.useState('');

    console.log('[ResetPasswordForm]');

    const goToPrev = () => {
        navigation && navigation.canGoBack() && navigation.pop();
    };
    const onSubmit = () => {
        typeof submit === 'function' && submit(inputValue);
    };

    return (
        <View style={[styles.wrapper, style]}>
            {/*<View>*/}
            <View style={[styles.container]}>
                <Button
                    title={title ? title : ''}
                    type="outline"
                    titleStyle={styles.title}
                    buttonStyle={styles.buttonTitle}
                    disabled={true}
                />
                <Input
                    placeholder={placeholder}
                    label={label}
                    labelStyle={styles.text}
                    leftIconContainerStyle={styles.leftIconContainer}
                    value={inputValue}
                    inputStyle={styles.text}
                    onChangeText={value => setInputValue(value)}
                    keyboardType="email-address"
                />
                <View style={styles.navigationRow}>
                    {!showBack ? (
                        <View />
                    ) : (
                        <Icon
                            type="font-awesome"
                            name="arrow-left"
                            onPress={goToPrev}
                            style={styles.icon}
                        />
                    )}
                    <Icon
                        type="font-awesome"
                        name="arrow-down"
                        onPress={onSubmit}
                        style={styles.icon}
                    />
                </View>
            </View>
            {/*</View>*/}
        </View>
    );
}

export function EmailForm(props) {
    const { navigation, onSubmit } = props;
    const submitEmail = result => {
        console.log(result);
        if (result) {
            onSubmit(true);
        }
    };
    const _onSubmit = async email => {
        const mail = typeof email === 'string' && email.trim().toLowerCase();
        try {
            await resetPassword({ email: mail }, submitEmail);
            console.log('Password reset email sent successfully');
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <ResetForm
            {...props}
            title={'Đặt lại mật khẩu bằng email'}
            label={'Email'}
            placeholder={'Nhập email cùa bạn'}
            submit={_onSubmit}
        />
    );
}

export function ConfirmTokenForm(props) {
    const submitEmail = result => {
        console.log(result);
        if (result) {
        }
    };
    const onSubmit = async token => {
        const _token = typeof token === 'string' && token.trim();
        try {
            await resetPassword({ token: _token }, submitEmail);
            console.log('Password confrim token sent successfully');
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <ResetForm
            {...props}
            title={'Nhập lại token để xác nhận lại email'}
            label={'Token kiểm tra'}
            placeholder={'Nhập token đã gửi vào mail cùa bạn'}
            submit={onSubmit}
        />
    );
}
