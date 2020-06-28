import React, { Component } from 'react'
import Button from '../../UI/Button/Button'

class OrderSummary extends Component {
  componentDidUpdate() {
    console.log('Component did update')
  }
  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(key => (
      <p key={key}>
        <span style={{ textTransform: 'capitalize' }}>{key}</span>: $
        {this.props.ingredients[key]}
      </p>
    ))
    return (
      <>
        <h3>Your Order</h3>
        <p>Burger with the following ingredients:</p>
        <ul>{ingredientSummary}</ul>
        <p>Continue to checkout?</p>
        <h1>Total: ${this.props.totalPrice.toFixed(2)}</h1>
        <Button btnType="Danger" clicked={this.props.cancelPurchase}>
          Cancel
        </Button>
        <Button
          btnType="Success"
          clicked={this.props.confirmPurchase}
          style={{ justifyContent: 'right' }}
        >
          Continue
        </Button>
      </>
    )
  }
}

export default OrderSummary
