import notifee from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';

function onMessageReceived(message) {
    notifee.displayNotification(JSON.parse(message.data.notifee));
}

messaging().onMessage(onMessageReceived);
messaging().setBackgroundMessageHandler(onMessageReceived);
