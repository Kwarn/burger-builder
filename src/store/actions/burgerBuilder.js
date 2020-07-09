import axios from '../../axios-orders'
import * as actionTypes from './actionTypes'

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
  return dispatch => {
    axios
      .get('ingredients.json')
      .then(res => {
        if (!res.data) {
          dispatch(fetchIngredientsFailed())
        } else {
          dispatch(setIngredients(res.data))
        }
      })
      .catch(err => {
        dispatch(fetchIngredientsFailed())
      })
  }
}

export const initPurchase = () => {
  return {
    type: actionTypes.INIT_PURCHASE
  }
}