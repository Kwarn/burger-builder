import * as actionTypes from '../actions/actionTypes'
import axios from 'axios'

const FIREBASE_API_KEY = 'AIzaSyAzXidjldfe5JtOOzrcoCz4siqPBqEnFsI'

export const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  }
}

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout())
    }, expirationTime * 1000)
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
  return dispatch => {
    dispatch(authStart())
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    }
    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`
    if (!isSignUp) {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`
    }
    axios
      .post(url, authData)
      .then(res => {
        console.log(res.data.idToken, res.data.localId)
        dispatch(authSuccess(res.data.idToken, res.data.localId))
        dispatch(checkAuthTimeout(res.data.expiresIn))
      })
      .catch(err => {
        console.log(err)
        dispatch(authFailed(err.response.data.error))
      })
  }
}
