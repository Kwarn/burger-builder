import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import { Route } from 'react-router-dom'
import ContactData from './ContactData/ContactData'

class Checkout extends Component {
  state = {
    ingredients: {},
  }

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search)
    const ingredients = {
      salad: +query.get('salad'),
      cheese: +query.get('cheese'),
      bacon: +query.get('bacon'),
      meat: +query.get('meat'),
    }
    this.setState({ ingredients: ingredients })
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack()
  }
  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data')
  }

  render() {
    return (
      <div>
        <CheckoutSummary
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
          ingredients={this.state.ingredients}
        />
        <Route
          path={this.props.match.path + '/contact-data'}
          component={ContactData}
        />
      </div>
    )
  }
}

export default Checkout
