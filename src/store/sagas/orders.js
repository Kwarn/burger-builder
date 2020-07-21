import { put } from 'redux-saga/effects'
import * as actions from '../actions/'
import axios from '../../axios-orders'

export function* fetchOrdersSaga(action) {
  yield put(actions.toggleIsLoading())

  const queryParams =
    '?auth=' +
    action.token +
    '&orderBy="userId"&equalTo="' +
    action.userId +
    '"'

  try {
    const res = yield axios.get('orders.json' + queryParams)
    const orders = []
    for (let key in res.data) {
      orders.push({
        id: key,
        ingredients: res.data[key].ingredients,
        totalPrice: res.data[key].price,
      })
    }
    yield put(actions.fetchOrdersSuccess(orders))
    yield put(actions.toggleIsLoading())
  } catch (error) {
    yield put(actions.fetchOrdersFailed(error))
    yield put(actions.toggleIsLoading())
  }
}

export function* postOrderSaga(action) {
  try {
    yield axios.post('/orders.json?auth=' + action.token, action.order)
    yield put(actions.postOrderSuccess())
  } catch (error) {
    yield put(actions.postOrderFailed(error))
  }
}
