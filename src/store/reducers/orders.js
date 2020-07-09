import * as actionTypes from '../actions/actionTypes'

const initalState = {
  orders: [],
}

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ORDERS_FAILED:
      return {
        ...state,
        error: action.error,
      }
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.orders,
      }
    default:
      return state
  }
}

export default reducer
