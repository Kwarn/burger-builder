import * as actionTypes from '../actions/actionTypes'

const initalState = {
  error: null
}

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case actionTypes.ORDER_COMPLETE: 
      return {
        ...state,
        
        // update state, is loading, find a way to redirect via props, conditional render Order Module?
      }
    default:
      return state
  }
}

export default reducer