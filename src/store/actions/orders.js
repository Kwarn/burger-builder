import axios from '../../axios-orders'
import * as actionTypes from './actionTypes'

export const fetchOrdersSuccess = orders => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders,
  }
}

export const fetchOrdersFailed = () => {
  return {
    type: actionTypes.FETCH_ORDERS_FAILED,
  }
}

export const fetchOrders = (token, userId) => {
  return dispatch => {
    dispatch(toggleIsLoading())
    const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"'
    axios
      .get('orders.json' + queryParams)
      .then(res => {
        if (res.data) {
          const orders = []
          for (let key in res.data) {
            orders.push({
              id: key,
              ingredients: res.data[key].ingredients,
              totalPrice: res.data[key].price,
            })
          }
          dispatch(fetchOrdersSuccess(orders))
        } else {
          dispatch(fetchOrdersFailed('Error Fetching Orders'))
        }
        dispatch(toggleIsLoading())
      })
      .catch(err => {
        dispatch(fetchOrdersFailed(err))
        dispatch(toggleIsLoading())
      })
  }
}

export const toggleIsLoading = () => {
  return {
    type: actionTypes.TOGGLE_IS_LOADING,
  }
}
