import { apiCall } from '../../services/api';
import { addError } from './errors';
import { LOAD_MESSAGES, REMOVE_MESSAGE } from '../actionTypes';

export const loadMessages = messages => ({
    type: LOAD_MESSAGES,
    messages
});

export const remove = id => {
    return {
        type: REMOVE_MESSAGE,
        id
    }
};

//need to send token in the header to show we are logged in. Doing this in api.js
export const fetchMessages = () => {
    //using a thunk
    return dispatch => {
        return apiCall('GET', 'api/messages')
            .then(res => {
                let filteredData = res.filter(message => !!message.user);
                dispatch(loadMessages(filteredData));
            })
            .catch(err => {
                addError(err.message);
            });
    };
};

export const removeMessage = (user_id, message_id) => {
    return dispatch => {
        return apiCall('delete', `api/users/${user_id}/messages/${message_id}`)
            .then(() =>
                dispatch(remove(message_id))
            )
            .catch(err =>
                addError(err.message)
            );
    }
}

//or export const postNewMessage = text => (dispatch, getState) => {...
export const postNewMessage = text => {
    return (dispatch, getState) => {
        let { currentUser } = getState();
        const id = currentUser.user.id;
        return apiCall('post', `/api/users/${id}/messages`, { text })
            .then(res => {
                //load messages will populate message list
            })
            .catch(err =>
                addError(err.message)
            );
    }
}