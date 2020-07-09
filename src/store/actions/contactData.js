import axios from '../../axios-orders'
import * as actionTypes from './actionTypes'

export const orderComplete = () => {
  return {
    type: actionTypes.ORDER_COMPLETE,
  }
}

export const postOrderFailed = error => {
  return {
    type: actionTypes.POST_ORDER_FAILED,
    error: error,
  }
}

export const postOrderToDb = order => {
  return dispatch => {
    axios
      .post('/orders.json', order)
      .then(res => {
        if (res.data) dispatch(orderComplete())
        else dispatch(postOrderFailed('Error Posting Order'))
      })
      .catch(err => {
        dispatch(postOrderFailed(err))
      })
  }
}
