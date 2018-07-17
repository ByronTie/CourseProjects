import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '../store';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './Navbar';
import Main from './Main';
import { setAuthorizationToken, currentUser, setCurrentUser } from '../store/actions/auth';
import jwtDecode from 'jwt-decode';

const store = configureStore();

//concept of hydration in cases when the server goes down or redux store clears
if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  //prevent someone from manually tampering with the key of jwtToken in localStorage
  try {
    //decode the middle part of the token
    store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
  } catch (err) {
    //force a logout
    store.dispatch(setCurrentUser({}));
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="onboarding">
            <Navbar />
            <Main />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
