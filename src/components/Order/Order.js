import React from 'react'
import classes from './Order.module.css'

const order = props => {
  const ingredientSummary = Object.keys(props.ingredients).map(ig => {
    return (
      <span key={ig} className={classes.Ingredients}>
        {ig}: ({props.ingredients[ig]})
      </span>
    )
  })

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientSummary}</p>
      <p>
        Price: <strong>£{props.totalPrice.toFixed(2)}</strong>
      </p>
    </div>
  )
}

export default order
