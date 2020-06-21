import axios from 'axios'
import {HOST_URL} from "./AppConst";

export const get = (url, message, callback, reject) => {
    console.log('get message', message)
    axios.get(url, message)
        .then(res => {
            if (res && res.data && typeof callback == 'function') {
                callback(res.data)
            }
        })
        .catch(e => {
            console.warn('[err get]', e);
            if (typeof reject === 'function') {
                reject();
            }
        })
}

export const post = (url, message, callback) => {
    let {data, headers} = message;
    axios.post(url, data,{headers: headers, timeout:2000})
        .then(response => {
            if (response.data && typeof callback === 'function') {
                callback(response.data)
            }
        }).catch(error => {
        console.warn('[err] ApiUtils post' + url, error)
    });
}

export const signIn =  (params, callback) => {
    let {email, password} = params;
    let data = {
        email: email,
        password: password
    }
    try {
         post(HOST_URL + 'auth/login', {data:data}, callback)
    } catch (e) {
        console.warn('[err] ApiUtils signIn', e)
    }
}


export const getUserCameras =  (params, callback, reject) => {
    let {userToken} = params;
    let message = {
        headers: {
            'Authorization': `Bearer ${userToken}`,
        },
    }
    get(HOST_URL + 'camera/listcam', message, callback, reject)

}

export const getMovingEvents = (params, callback, reject) => {
    let {camera = {}, userToken} = params;
    let {_id} = camera;
    let message = {
        data: {_id:_id},
        headers: {
            Authorization: `Bearer ${userToken}`,
            // timeout:2000,
       },

    }

    post(HOST_URL + 'camera/savedvideo',message, callback)
}
