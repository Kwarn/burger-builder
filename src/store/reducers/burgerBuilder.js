import * as actionTypes from '../actions/actionTypes'

const initalState = {
  ingredients: { salad: 0, cheese: 0, bacon: 0, meat: 0 },
  totalPrice: 4.5,
  purchaseable: false
}

const INGREDIENTS_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  bacon: 0.7,
  meat: 1.3,
}

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.iName]: state.ingredients[action.iName] + 1,
        },
        totalPrice:
          state.totalPrice + INGREDIENTS_PRICES[action.iName],
        purchaseable: true,
      }

    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.iName]: state.ingredients[action.iName] - 1,
        },
        totalPrice:
          state.totalPrice - INGREDIENTS_PRICES[action.iName],
        purchaseable:
          Object.values(state.ingredients).reduce((acc, cur) => acc + cur) > 1,
      }

    default:
      return state
  }
}

export default reducer
