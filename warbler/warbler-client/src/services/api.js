import axios from 'axios';

export function setTokenHeader(token) {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
}

export function apiCall(method, path, data) {
    //return new Promise to allow bubble up of handling pass/fails
    return new Promise((resolve, reject) => {
        let axiosMethod = method.toLowerCase();

        return axios[axiosMethod](path, data)
            .then(res => {
                return resolve(res.data); //contains the token
            })
            .catch(err => {
                // response object from axios
                return reject(err.response.data.error);
            });
    });
}