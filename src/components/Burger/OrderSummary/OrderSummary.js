import React from 'react'
import Button from '../../UI/Button/Button'

const OrderSummary = props => {
  const ingredientSummary = Object.keys(props.ingredients).map(key => (
    <p key={key}>
      <span style={{ textTransform: 'capitalize' }}>{key}</span>: £
      {props.ingredients[key]}
    </p>
  ))
  return (
    <>
      <h3>Your Order</h3>
      <p>Burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>Continue to checkout?</p>
      <h1>Total: £{props.totalPrice.toFixed(2)}</h1>
      <Button btnType="Danger" clicked={props.cancelPurchase}>
        Cancel
      </Button>
      <Button
        btnType="Success"
        clicked={props.confirmPurchase}
        style={{ justifyContent: 'right' }}
      >
        Continue
      </Button>
    </>
  )
}

export default OrderSummary
