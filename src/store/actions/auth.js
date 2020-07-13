import * as actionTypes from '../actions/actionTypes'
import axios from 'axios'

const FIREBASE_API_KEY = 'AIzaSyAzXidjldfe5JtOOzrcoCz4siqPBqEnFsI'

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  }
}

export const authSuccess = authData => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData: authData,
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
        console.log(res)
        dispatch(authSuccess(res.data))
      })
      .catch(err => {
        console.log(err)
        dispatch(authFailed(err))
      })
  }
}
