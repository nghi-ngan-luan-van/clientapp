import axios from 'axios';
import { HOST_URL } from './AppConst';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { AppRoute } from '../navigation/app-routes';

export const get = (url, message, callback) => {
    // console.log('get message', message)
    axios
        .get(url, message)
        .then(res => {
            if (res && res.data && typeof callback === 'function') {
                callback(res.data);
            }
        })
        .catch(e => {
            console.warn('[err get]' + url, e);
            if (typeof callback === 'function') {
                callback();
            }
        });
};

export const post = (url, message, callback) => {
    let { data, headers } = message;
    console.log('post message', headers);
    axios
        .post(url, data, { headers: headers })
        .then(response => {
            if (response.data && typeof callback === 'function') {
                callback(response.data);
            }
        })
        .catch(error => {
            console.warn('[err] ApiUtils post' + url, error);
            callback && callback();
        });
};

export const signIn = (params, callback) => {
    let { email, password } = params;
    let data = {
        email: email,
        password: password,
    };
    try {
        post(HOST_URL + 'auth/login', { data: data }, callback);
    } catch (e) {
        console.warn('[err] ApiUtils signIn', e);
        callback();
    }
};
export const signInGG = (params, callback) => {
    try {
        post(HOST_URL + 'auth/login', { data: params }, callback);
    } catch (e) {
        console.warn('[err] ApiUtils signIn', e);
        callback();
    }
};
export const signUp = (params, callback) => {
    let { name, email, password } = params;
    let data = {
        name: name,
        email: email,
        password: password,
    };
    try {
        post(HOST_URL + 'auth/register', { data: data }, callback);
    } catch (e) {
        console.warn('[err] ApiUtils signUp', e);
        callback();
    }
};
export const getUserCameras = async (params, callback) => {
    // const userToken = await AsyncStorage.getItem('userToken');
    let { userToken } = params;
    let message = {
        headers: {
            Authorization: `Bearer ${userToken}`,
        },
    };
    get(HOST_URL + 'camera/listcam', message, callback);
};

export const getMovingEvents = (params, callback) => {
    let { camera = {}, userToken } = params;
    let { _id } = camera;
    let message = {
        // data: { _id: _id },
        headers: {
            Authorization: `Bearer ${userToken}`,
            // timeout:2000,
        },
    };

    get(HOST_URL + 'camera/savedvideo/' + _id, message, callback);
};

export const getBackupVideo = (params, callback) => {
    let { camera = {}, userToken } = params;
    let { _id } = camera;
    let message = {
        // data: { _id: _id },
        headers: {
            Authorization: `Bearer ${userToken}`,
            // timeout:2000,
        },
    };

    get(HOST_URL + 'camera/recordedvideo/' + _id, message, callback);
};
// const renderAlertDelete = () => {
//     return Alert.alert(
//         'Warning',
//         'Do you want to permanently delete this camera ?',
//         [
//             {
//                 text: 'OK',
//                 onPress: async () => {
//                     const token = await AsyncStorage.getItem('userToken');
//                     let myHeaders = new Headers();
//                     myHeaders.append('Authorization', `Bearer ${token}`);
//                     myHeaders.append('Content-Type', 'application/json');
//
//                     let raw = JSON.stringify({ _id: camera._id });
//
//                     let requestOptions = {
//                         method: 'POST',
//                         headers: myHeaders,
//                         body: raw,
//                         redirect: 'follow',
//                     };
//
//                     fetch(HOST_URL + 'camera/delete', requestOptions)
//                         .then(response => response.text())
//                         .then(result => {
//                             let { navigation } = props;
//                             navigation && navigation.push(AppRoute.HOME, {});
//                         });
//                 },
//             },
//             {
//                 text: 'Cancel',
//                 onPress: () => console.log('Cancel Pressed'),
//                 style: 'cancel',
//             },
//         ],
//         { cancelable: false }
//     );
// };

// export const testConnectionCamera = (params, callback) => {
//     let { rtspUrl = {}, userToken } = params;
//     let data = {
//         rtspUrl: rtspUrl,
//     };
//     let  headers = {
//             Authorization: `Bearer ${userToken}`,
//         }
//     try {
//         post(HOST_URL + 'camera/testconnection', { data: data },{headers}, callback);
//     } catch (e) {
//         console.warn('[err] ApiUtils test connection', e);
//     }
// };
