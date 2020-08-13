import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AppNavigator from './react-native-src/navigation/AppNavigator';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import auth from '@react-native-firebase/auth';

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

    // useEffect(() => {
    //     // Assume a message-notification contains a "type" property in the data payload of the screen to open
    //
    //     messaging().onNotificationOpenedApp(remoteMessage => {
    //         console.log(
    //             'Notification caused app to open from background state:',
    //             remoteMessage.notification
    //         );
    //         // navigation.navigate(remoteMessage.data.type);
    //     });
    //     // Check whether an initial notification is available
    //     messaging()
    //         .getInitialNotification()
    //         .then(remoteMessage => {
    //             if (remoteMessage) {
    //                 console.log(
    //                     'Notification caused app to open from quit state:',
    //                     remoteMessage.notification
    //                 );
    //                 setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
    //             }
    //             setLoading(false);
    //         });
    // }, []);
    useEffect(() => {
        messaging()
            .requestPermission()
            .then(value => {
                messaging()
                    .getToken()
                    .then(token => {
                        console.log('FCM_token', token);
                    });
            });
        // return messaging().onTokenRefresh(token => {
        //     saveTokenToDatabase(token);
        // });
    }, []);

    async function registerAppWithFCM() {
        await messaging().registerDeviceForRemoteMessages();
    }

    // if (loading) {
    //     return null;
    // } else {
    return (
        <SafeAreaProvider>
            <NavigationContainer independent={true}>
                <AppNavigator />
            </NavigationContainer>
        </SafeAreaProvider>
    );
    // }
}

export default App;
