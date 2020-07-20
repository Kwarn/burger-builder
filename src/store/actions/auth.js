import * as actionTypes from '../actions/actionTypes'

export const setRedirectPathOnLogin = path => {
  return {
    type: actionTypes.SET_REDIRECT_PATH_ON_LOGIN,
    path: path,
  }
}

export const logout = () => {
  return {
    type: actionTypes.AUTH_INIT_LOGOUT,
  }
}

export const logoutSuccess = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  }
}

export const checkAuthTimeout = expirationTime => {
  return {
    type: actionTypes.AUTH_CHECK_TIMEOUT,
    expirationTime: expirationTime,
  }
}

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  }
}

export const authSuccess = (idToken, localId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: idToken,
    userId: localId,
  }
}

export const authFailed = error => {
  return {
    type: actionTypes.AUTH_FAILED,
    error: error,
  }
}

export const auth = (email, password, isSignUp) => {
  return {
    type: actionTypes.AUTH_USER,
    email: email,
    password: password,
    isSignUp: isSignUp,
  }
}

export const tryAutoLogin = () => {
  return {
    type: actionTypes.TRY_AUTO_LOGIN,
  }
}
