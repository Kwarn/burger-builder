import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

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

const addIngredient = (state, action) => {
  const iToUpdate = { [action.iName]: state.ingredients[action.iName] + 1 }
  const updatedIngredients = updateObject(state.ingredients, iToUpdate)
  const stateToUpdate = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.iName],
    isPurchasable: true,
  }
  return updateObject(state, stateToUpdate)
}

// isPurchasable disables 'Order now' button if removing this ingredient leaves the burger empty
const removeIngredient = (state, action) => {
  const iToUpdate = { [action.iName]: state.ingredients[action.iName] - 1 }
  const updatedIngredients = updateObject(state.ingredients, iToUpdate)
  const stateToUpdate = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.iName],
    isPurchasable:
      Object.values(state.ingredients).reduce((acc, cur) => acc + cur) > 1,
  }
  return updateObject(state, stateToUpdate)
}

// forces order of otherwise alphabetically sorted ingredients (fetched)
// so burger ingredients are in aesthetic correct order (salad top - meat bottom)
const setIngredients = (state, action) => {
  return updateObject(state, {
    ingredients: {
      salad: action.ingredients.salad,
      cheese: action.ingredients.cheese,
      bacon: action.ingredients.bacon,
      meat: action.ingredients.meat,
    },
    totalPrice: 4.5,
    error: false,
  })
}

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action)

    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action)

    case actionTypes.SET_INGREDIENTS:
      return setIngredients(state, action)

    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return updateObject(state, { error: true })

    default:
      return state
  }
}

export default reducer
