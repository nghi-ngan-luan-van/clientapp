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
    useEffect(() => {
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
        });

        return unsubscribe;
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
