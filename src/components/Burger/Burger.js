import React from 'react'
import Ingredient from './Ingredient/Ingredient.js'
import classes from './Burger.module.css'

const Burger = props => {

  const ingredientElements = []
  for (let key in props.ingredients)
    for (let i = 0; i < props.ingredients[key]; i++)
      ingredientElements.push(<Ingredient key={key + i} type={key} />)

  return (
    <div className={classes.Burger}>
      <Ingredient type="bread-top"></Ingredient>
      {ingredientElements.length ? (
        ingredientElements
      ) : (
        <p>Start Adding Ingredients</p>
      )}
      <Ingredient type="bread-bottom"></Ingredient>
    </div>
  )
}

export default Burger
