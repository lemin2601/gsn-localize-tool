import axios from 'axios'

let accessToken = '';
export const setAccessToken = token =>{
    accessToken = token;
}

export const get = url => {
    return axios
        .get(url, {
            headers:{'authorization':accessToken}
        })
        .then(response => {
            console.log('got !!');
            return response;
        })
}
export const post = (url,data) => {
    data.headers= {'authorization':accessToken}
    return axios
        .post(url, {
            ...data,
            headers:{'authorization':accessToken}
        })
        .then(response => {
            console.log('post !!');      
            return response
        })
}

export const put = (url,data) => {
    return axios
        .put(url, {
            ...data,
            headers:{'authorization':accessToken}
        })
        .then(response => {
            console.log('updated!')
            return response;
        })
}

export const del = (url) => {
    return axios
        .delete(url, {
            headers:{'authorization':accessToken}
        })
        .then(response => {
            console.log('deleted!')
            return response;
        })
}