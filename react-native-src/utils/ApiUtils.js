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
        data: { _id: _id },
        headers: {
            Authorization: `Bearer ${userToken}`,
            // timeout:2000,
        },
    };

    post(HOST_URL + 'camera/savedvideo', message, callback);
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