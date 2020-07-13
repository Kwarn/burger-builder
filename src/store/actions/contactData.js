import axios from '../../axios-orders'
import * as actionTypes from './actionTypes'

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

export const postOrderToDb = (order, token) => {
  return dispatch => {
    axios
      .post('/orders.json?auth=' + token, order)
      .then(res => {
        if (res.data) dispatch(postOrderSuccess())
        else dispatch(postOrderFailed('Error Posting Order'))
      })
      .catch(err => {
        dispatch(postOrderFailed(err))
      })
  }
}
