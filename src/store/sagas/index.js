import { takeEvery, all, takeLatest } from 'redux-saga/effects'
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
  yield all([
    takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
    takeEvery(actionTypes.AUTH_INIT_LOGOUT, logoutSaga),
    takeEvery(actionTypes.AUTH_USER, authUserSaga),
    takeEvery(actionTypes.TRY_AUTO_LOGIN, tryAutoLoginSaga),
  ])
}

export function* watchBurgerBuilder() {
  yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga)
}

export function* watchOrders() {
  yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga)
  yield takeLatest(actionTypes.POST_ORDER, postOrderSaga)
}
