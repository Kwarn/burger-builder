import * as actionTypes from '../actions/actionTypes'

const initalState = {
  redirect: false
}

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case actionTypes.POST_ORDER_FAILED: 
      return {
        ...state,
        error: action.error
      }
    case actionTypes.ORDER_COMPLETE: 
      return {
        ...state,
        redirect: true
      }
    default:
      return state
  }
}

export default reducer