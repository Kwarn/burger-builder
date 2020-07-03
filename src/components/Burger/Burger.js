import React from 'react'
import classes from './Burger.module.css'
import Ingredient from './Ingredient/Ingredient.js'

const Burger = props => {
  console.log(props.ingredients)
  // const ingredients = {
  //   salad: props.ingredients.salad,
  //   cheese: props.ingredients.cheese,
  //   bacon: props.ingredients.bacon,
  //   meat: props.ingredients.meat,
  // }

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
