import * as actions from './actions'

const initalState = {
  ingredients: { salad: 0, cheese: 0, bacon: 0, meat: 0 },
  totalPrice: 4.5,
}

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case actions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
        },
      }

    case actions.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
        },
      }

    default:
      return state
  }
}

export default reducer
