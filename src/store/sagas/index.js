import { takeEvery } from 'redux-saga/effects'
import {
  logoutSaga,
  checkAuthTimeoutSaga,
  authUserSaga,
  tryAutoLoginSaga,
} from './auth'
import { initIngredientsSaga } from './burgerBuilder'
import { fetchOrdersSaga, postOrderSaga } from './orders'
import * as actionTypes from '../actions/actionTypes'

export function* watchAuth() {
  yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga)
  yield takeEvery(actionTypes.AUTH_INIT_LOGOUT, logoutSaga)
  yield takeEvery(actionTypes.AUTH_USER, authUserSaga)
  yield takeEvery(actionTypes.TRY_AUTO_LOGIN, tryAutoLoginSaga)
}

export function* watchBurgerBuilder() {
  yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga)
}

export function* watchOrders() {
  yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga)
  yield takeEvery(actionTypes.POST_ORDER, postOrderSaga)
}
