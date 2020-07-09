import * as actionTypes from '../actions/actionTypes'

const initalState = {
  ingredients: null,
  totalPrice: 4.5,
  isPurchasable: false,
  error: false,
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
        totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.iName],
    // isPurchasable toggles disabled on "Order Now" button.
        isPurchasable: true,
      }

    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.iName]: state.ingredients[action.iName] - 1,
        },
        totalPrice: state.totalPrice - INGREDIENTS_PRICES[action.iName],
    // disables 'Order now' button if removing this ingredient leaves the burger empty
        isPurchasable:
          Object.values(state.ingredients).reduce((acc, cur) => acc + cur) > 1,
      }

    // forces order of otherwise alphabetically sorted ingredients (fetched)
    // so burger ingredients are in aesthetic correct order (salad top - meat bottom)
    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: {
          salad: action.ingredients.salad,
          cheese: action.ingredients.cheese,
          bacon: action.ingredients.bacon,
          meat: action.ingredients.meat,
        },
        error: false,
      }

    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true,
      }

    default:
      return state
  }
}

export default reducer
