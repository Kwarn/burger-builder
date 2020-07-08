import axios from '../../axios-orders'
import * as actionTypes from './actionTypes'

export const orderComplete = () => {
  return {
    type: actionTypes.ORDER_COMPLETE
  }
}

export const errorPostingToDb = () => {
  return {
    type: actionTypes.POST_ORDER_FAILED
  }
}

export const postOrderToDb = order => {
  return dispatch => {
    axios
      .post('/orders.json', order)
      .then(res => {
        if (res.data)
          dispatch(orderComplete())
        else
          dispatch(errorPostingToDb())
      })
      .catch(err => {
        dispatch(errorPostingToDb())
      })
  }
}
