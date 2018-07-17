//------------------
// ROOT REDUCER
//------------------
import { combineReducers } from 'redux';
import currentUser from './currentUser';
import errors from './errors';
import messages from './messages';

//these can be access from any action creators and Component using mapStateToProps
const rootReducer = combineReducers({
    currentUser,
    errors,
    messages
});

export default rootReducer;