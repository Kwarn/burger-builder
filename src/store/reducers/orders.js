import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

const initalState = {
  orders: [],
  isLoading: false,
  shouldRedirect: false,
}

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case actionTypes.IS_LOADING:
      return updateObject(state, { isLoading: !state.isLoading })

    case actionTypes.POST_ORDER_FAILED:
      return updateObject(state, { error: action.error, isLoading: false })

    case actionTypes.POST_ORDER_SUCCESS:
      return updateObject(state, { shouldRedirect: true, isLoading: false })

    case actionTypes.FETCH_ORDERS_FAILED:
      return updateObject(state, { error: action.error })

    case actionTypes.FETCH_ORDERS_SUCCESS:
      return updateObject(state, { orders: action.orders })

    case actionTypes.INIT_PURCHASE:
      return updateObject(state, { shouldRedirect: false })

    default:
      return state
  }
}

export default reducer
