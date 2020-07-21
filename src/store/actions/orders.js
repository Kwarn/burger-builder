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
  return {
    type: actionTypes.FETCH_ORDERS,
    token: token,
    userId: userId,
  }
}

export const toggleIsLoading = () => {
  return {
    type: actionTypes.TOGGLE_IS_LOADING,
  }
}

export const postOrderSuccess = () => {
  return {
    type: actionTypes.POST_ORDER_SUCCESS,
  }
}

export const postOrderFailed = error => {
  return {
    type: actionTypes.POST_ORDER_FAILED,
    error: error,
  }
}

export const postOrder = (order, token) => {
  return {
    type: actionTypes.POST_ORDER,
    order: order,
    token: token,
  }
}
