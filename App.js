import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './react-native-src/navigation/AppNavigator';
import AsyncStorage from '@react-native-community/async-storage';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';
import firestore from '@react-native-firebase/firestore';
import { SafeAreaProvider } from 'react-native-safe-area-context';
function App() {
    // const navigation = useNavigation();
    const [loading, setLoading] = useState(true);
    const [initialRoute, setInitialRoute] = useState('Home');
    console.disableYellowBox = true;

    async function saveTokenToDatabase(token) {
        // Assume user is already signed in
        const userId = auth().currentUser.uid;

        // Add the token to the users datastore
        await firestore()
            .collection('users')
            .doc(userId)
            .update({
                tokens: firestore.FieldValue.arrayUnion(token),
            });
    }

    useEffect(() => {
        // Assume a message-notification contains a "type" property in the data payload of the screen to open

        messaging().onNotificationOpenedApp(remoteMessage => {
            console.log(
                'Notification caused app to open from background state:',
                remoteMessage.notification
            );
            // navigation.navigate(remoteMessage.data.type);
        });

        // Check whether an initial notification is available
        messaging()
            .getInitialNotification()
            .then(remoteMessage => {
                if (remoteMessage) {
                    console.log(
                        'Notification caused app to open from quit state:',
                        remoteMessage.notification
                    );
                    setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
                }
                setLoading(false);
            });
    }, []);
    useEffect(() => {
        // Get the device token
        messaging()
            .getToken()
            .then(token => {
                console.log('sdfghlkjhgfdsdfghjkjhgf', token);
                return saveTokenToDatabase(token);
            });

        // If using other push notification providers (ie Amazon SNS, etc)
        // you may need to get the APNs token instead for iOS:
        // if(Platform.OS == 'ios') { messaging().getAPNSToken().then(token => { return saveTokenToDatabase(token); }); }

        // Listen to whether the token changes
        return messaging().onTokenRefresh(token => {
            saveTokenToDatabase(token);
        });
    });

    if (loading) {
        return null;
    }
    // useEffect(() => {
    //     PushNotification.configure({
    //         // (optional) Called when Token is generated (iOS and Android)
    //         onRegister: function (token) {
    //             console.log('TOKEN:', token);
    //         },
    //
    //         // (required) Called when a remote is received or opened, or local notification is opened
    //         onNotification: function (notification) {
    //             console.log('NOTIFICATION:', notification);
    //
    //             // process the notification
    //
    //             // (required) Called when a remote is received or opened, or local notification is opened
    //             notification.finish(PushNotificationIOS.FetchResult.NoData);
    //         },
    //
    //         // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
    //         onAction: function (notification) {
    //             console.log('ACTION:', notification.action);
    //             console.log('NOTIFICATION:', notification);
    //
    //             // process the action
    //         },
    //
    //         // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
    //         onRegistrationError: function (err) {
    //             console.error(err.message, err);
    //         },
    //
    //         // IOS ONLY (optional): default: all - Permissions to register.
    //         permissions: {
    //             alert: true,
    //             badge: true,
    //             sound: true,
    //         },
    //
    //         // Should the initial notification be popped automatically
    //         // default: true
    //         popInitialNotification: true,
    //
    //         /**
    //          * (optional) default: true
    //          * - Specified if permissions (ios) and token (android and ios) will requested or not,
    //          * - if not, you must call PushNotificationsHandler.requestPermissions() later
    //          * - if you are not using remote notification or do not have Firebase installed, use this:
    //          *     requestPermissions: Platform.OS === 'ios'
    //          */
    //         requestPermissions: true,
    //     });
    // }, []);
    return (
        <SafeAreaProvider>
            <NavigationContainer independent={true}>
                <AppNavigator />
            </NavigationContainer>
        </SafeAreaProvider>
    );
}

export default App;
