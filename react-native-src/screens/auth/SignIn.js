import React, { useState } from 'react';
import {
    Dimensions,
    Image,
    Keyboard,
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { AppRoute } from '../../navigation/app-routes';

const { width, height } = Dimensions.get('window');
import { Button } from 'react-native-elements';
import { Colors } from '../../utils/AppConfig';

import { useSafeArea } from 'react-native-safe-area-context';
import SignInForm from './SignInForm';

export default function SignIn(props) {
    const insets = useSafeArea();

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ flex: 1, backgroundColor: Colors.screen }}
            contentContainerStyle={styles.contentContainer}
        >
            <View style={[styles.topView, { paddingTop: insets.top }]}>
                <View style={styles.gif}>
                    <Image
                        style={styles.backgroundImg}
                        source={require('../../assets/camera.gif')}
                    />
                </View>

                <Text style={styles.appname}>C L O M E R A</Text>
            </View>

            <SignInForm
                {...props}
                style={{
                    marginTop: -(insets.top + 80),
                }}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    contentContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.screen,
    },
    topView: {
        width,
        height: height * 0.55,
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: Colors.purple_blue,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
    },
    bottomView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundImg: {
        height: 180,
        width: 180,
        borderRadius: 90,
        // resizeMode: 'contain',
        overlayColor: 'transparent',
    },
    gif: {
        width: 180,
        height: 180,
        borderRadius: 90,
        overlayColor: '#fff',
        overflow: 'hidden',
        marginTop: 10,
    },
    title: {
        fontWeight: 'bold',
    },
    shadow: {
        shadowOffset: { width: 10, height: 10 },
        shadowColor: Colors.arapawa,
        shadowOpacity: 0.4,
        elevation: 5,
    },
    appname: {
        fontSize: 30,
        marginTop: 12,
        fontWeight: 'bold',
        color: Colors.brandy_rose,
    },
    textBold: { fontSize: 14, color: Colors.violet, fontWeight: 'bold' },
});
