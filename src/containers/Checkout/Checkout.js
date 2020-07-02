import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'

class Checkout extends Component {
  checkoutCancelledHandler = () => {
    this.props.history.goBack()
  }
  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data')
  }

  render() {
    const query = new URLSearchParams(this.props.location.search)

    const ingredients = {
      salad: +query.get('salad'),
      cheese: +query.get('cheese'),
      bacon: +query.get('bacon'),
      meat: +query.get('meat'),
    }

    return (
      <div>
        <CheckoutSummary
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
          ingredients={ingredients}
        />
      </div>
    )
  }
}

export default Checkout
