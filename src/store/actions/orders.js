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

export const fetchOrdersFromDb = () => {
  return dispatch => {
    axios
      .get('orders.json')
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
      })
      .catch(err => {
        dispatch(fetchOrdersFailed(err))
      })
  }
}
