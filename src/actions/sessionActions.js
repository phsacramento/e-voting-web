import * as types   from './actionTypes';
import sessionApi   from '../lib/api/sessionApi';
import auth         from '../auth/authenticator';


export const loginSuccess = () => {
  return {type: types.LOG_IN_SUCCESS}
}

export const loginUser = (credentials) => {
  return function(dispatch) {
    return sessionApi.login(credentials).then(response => {
      sessionStorage.setItem('jwt', response.jwt);
      sessionStorage.setItem('auth', JSON.stringify({'AUTHORIZATION': `Bearer ${response.jwt}`}))
      dispatch(loginSuccess());
    }).catch(error => {
      throw(error);
    });
  };
}

export const logOutUser = () => {
  auth.logOut();
  return {type: types.LOG_OUT}
}
