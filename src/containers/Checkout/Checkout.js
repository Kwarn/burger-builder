import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import { Route } from 'react-router-dom'
import ContactData from './ContactData/ContactData'

class Checkout extends Component {
  state = {
    ingredients: null,
    price: 0,
  }

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search)
    console.log('CHECKOUT- DIDMOUNT')
    const ingredients = {
      salad: +query.get('salad'),
      cheese: +query.get('cheese'),
      bacon: +query.get('bacon'),
      meat: +query.get('meat'),
    }
    const price = +query.get('price')
    this.setState({ ingredients: ingredients, price: price })
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
          render={props => (
            <ContactData
              ingredients={this.state.ingredients}
              price={this.state.price}
              {...props}
            />
          )}
        />
      </div>
    )
  }
}

export default Checkout
