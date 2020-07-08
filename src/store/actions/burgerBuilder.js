import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'

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

export const initIngredients = () => {
  return dispatch => {
    axios
      .get('https://react-burger-builder-679aa.firebaseio.com/ingredients.json')
      .then(res => {
        dispatch(setIngredients(res.data))
      })
      .catch(err => {
        dispatch(fetchingIngredientsFailed())
      })
  }
}

export const fetchingIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
  }
}
