import { takeEvery } from 'redux-saga/effects'
import {
  logoutSaga,
  checkAuthTimeoutSaga,
  authUserSaga,
  tryAutoLoginSaga,
} from './auth'
import * as actionTypes from '../actions/actionTypes'

export function* watchAuth() {
  yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga)
  yield takeEvery(actionTypes.AUTH_INIT_LOGOUT, logoutSaga)
  yield takeEvery(actionTypes.AUTH_USER, authUserSaga)
  yield takeEvery(actionTypes.TRY_AUTO_LOGIN, tryAutoLoginSaga)
}
