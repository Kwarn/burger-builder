import * as actionTypes from '../actions/actionTypes'

const initalState = {
  orders: [],
  isLoading: false,
  redirect: false
}

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case actionTypes.IS_LOADING:
      return {
        ...state,
        isLoading: true
      }
    case actionTypes.POST_ORDER_FAILED:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    case actionTypes.POST_ORDER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        redirect: true
      }
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
      case actionTypes.INIT_PURCHASE:
        return {
          ...state,
          redirect: false
        }
    default:
      return state
  }
}

export default reducer
