import { put, delay } from 'redux-saga/effects'
import * as actions from '../actions'
import axios from 'axios'

const FIREBASE_API_KEY = 'AIzaSyAzXidjldfe5JtOOzrcoCz4siqPBqEnFsI'

export function* logoutSaga(action) {
  yield localStorage.removeItem('token')
  yield localStorage.removeItem('userId')
  yield localStorage.removeItem('expirationDate')
  yield put(actions.logoutSuccess())
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000)
  yield put(actions.logout())
}

export function* authUserSaga(action) {
  yield put(actions.authStart())
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true,
  }
  let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`
  if (!action.isSignUp) {
    url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`
  }

  try {
    const res = yield axios.post(url, authData)
    const expirationDate = new Date(
      new Date().getTime() + res.data.expiresIn * 1000
    )
    localStorage.setItem('token', res.data.idToken)
    localStorage.setItem('userId', res.data.localId)
    localStorage.setItem('expirationDate', expirationDate)
    yield put(actions.authSuccess(res.data.idToken, res.data.localId))
    yield put(actions.checkAuthTimeout(res.data.expiresIn))
  } catch (err) {
    yield put(actions.authFailed(err.response.data.error))
  }
}

export function* tryAutoLoginSaga(action) {
  const token = localStorage.getItem('token')
  const userId = localStorage.getItem('userId')
  if (!token) {
    yield put(actions.logout())
  } else {
    const expirationDate = new Date(localStorage.getItem('expirationDate'))
    if (expirationDate <= new Date().getTime()) {
      yield put(actions.logout())
    } else {
      yield put(actions.authSuccess(token, userId))
      yield put(
        actions.checkAuthTimeout(
          (expirationDate.getTime() - new Date().getTime()) / 1000
        )
      )
    }
  }
}