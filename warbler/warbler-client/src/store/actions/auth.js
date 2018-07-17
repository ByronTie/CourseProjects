import { apiCall, setTokenHeader } from '../../services/api';
import { SET_CURRENT_USER } from '../actionTypes';
import { addError, removeError } from './errors';

export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user
    }
};

export function setAuthorizationToken(token) {
    setTokenHeader(token);
}

export function logout() {
    //using a thunk here too because we want to dispatch another action
    return dispatch => {
        localStorage.clear();
        setAuthorizationToken(false);
        dispatch(setCurrentUser({}));
    }
}

export function authUser(type, userData) {
    //return a function
    return dispatch => {
        //wait for api call to finish before dispatch => use a Promise
        return new Promise((resolve, reject) => {
            //type as 'signup', 'signin', etc
            return apiCall("POST", `/api/auth/${type}`, userData)
                //deconstruct from data param
                .then(({ token, ...user }) => {
                    localStorage.setItem("jwtToken", token);
                    setAuthorizationToken(token);
                    dispatch(setCurrentUser(user));
                    dispatch(removeError());
                    resolve();
                })
                .catch(err => {
                    let error = err ? err.message : "Server is unavailable.";
                    dispatch(addError(error));
                    reject(err);
                });
        });
    };
}