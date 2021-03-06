import * as actionTypes from './actionTypes'

export const resetBurgerBuilder = () => {
  return {
    type: actionTypes.RESET_BURGER_BUILDER,
  }
}

export const addIngredient = name => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    iName: name,
  }
}

export const removeIngredient = name => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    iName: name,
  }
}

export const setIngredients = ingredients => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients,
  }
}

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
  }
}

export const initIngredients = () => {
  return {
    type: actionTypes.INIT_INGREDIENTS,
  }
}

export const initPurchase = () => {
  return {
    type: actionTypes.INIT_PURCHASE,
  }
}
