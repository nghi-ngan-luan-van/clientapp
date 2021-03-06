import axios from 'axios';
import { HOST_URL } from './AppConst';

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
    console.log(data);
    axios
        .post(url, data, { headers: headers })
        .then(response => {
            console.log('response post', response);
            if (response.data && typeof callback === 'function') {
                callback(response.data);
            } else if (response.config && response.config.data && typeof callback === 'function') {
                callback(response.config.data);
            }
        })
        .catch(error => {
            console.warn('[err] ApiUtils post ' + url, error);
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
        post(HOST_URL + 'auth/google', { data: params }, callback);
    } catch (e) {
        console.warn('[err] ApiUtils signInGG', e);
        callback();
    }
};

// /auth/verifytoken
export const verifytoken = (params, callback) => {
    try {
        post(HOST_URL + 'auth/verifytoken', { data: params }, callback);
    } catch (e) {
        console.warn('[err] ApiUtils verifytoken', e);
        callback();
    }
};
export const signUp = (params, callback) => {
    try {
        post(HOST_URL + 'auth/register', { data: params }, callback);
    } catch (e) {
        console.warn('[err] ApiUtils signUp', e);
        callback();
    }
};
export const resetPassword = (params, callback) => {
    try {
        post(HOST_URL + 'user/mailReset', { data: params }, callback);
    } catch (e) {
        console.warn('[err] ApiUtils mailReset', e);
        callback();
    }
};
export const changePassword = (params, callback) => {
    try {
        post(HOST_URL + 'user/changePassword', { data: params }, callback);
    } catch (e) {
        console.warn('[err] ApiUtils change password', e);
        callback();
    }
};

export const testConnection = (params, callback) => {
    const { rtspUrl, userToken } = params;
    const message = {
        headers: {
            Authorization: `Bearer ${userToken}`,
        },
        data: {
            rtspUrl: rtspUrl,
        },
    };
    try {
        post(HOST_URL + 'camera/testconnection', message, callback);
    } catch (e) {
        console.warn('[err] ApiUtils test Connection', e);
        callback();
    }
};

export const turnDetect = (params, callback) => {
    const { _id, userToken } = params;
    const message = {
        headers: {
            Authorization: `Bearer ${userToken}`,
        },
        data: {
            _id: _id,
        },
    };
    try {
        post(HOST_URL + 'camera/turndetect', message, callback);
    } catch (e) {
        console.warn('[err] ApiUtils turndetect', e);
        callback();
    }
};

export const deleteCam = (params, callback) => {
    const { _id, userToken } = params;
    const message = {
        headers: {
            Authorization: `Bearer ${userToken}`,
        },
        data: {
            _id: _id,
        },
    };
    try {
        post(HOST_URL + 'camera/delete', message, callback);
    } catch (e) {
        console.warn('[err] ApiUtils test delete', e);
        callback();
    }
};
export const switchRecordMode = (params, callback) => {
    const { _id, userToken } = params;
    const message = {
        headers: {
            Authorization: `Bearer ${userToken}`,
        },
        data: {
            _id: _id,
        },
    };
    try {
        post(HOST_URL + 'camera/recorddetect', message, callback);
    } catch (e) {
        console.warn('[err] ApiUtils test delete', e);
        callback();
    }
};
export const addCamera = (params, callback) => {};
export const getUserCameras = async (params, callback) => {
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
export const getAllVideo = (params, callback) => {
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
