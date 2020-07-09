import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'

class Checkout extends Component {
  checkoutCancelledHandler = () => this.props.history.goBack()

  checkoutContinuedHandler = () =>
    this.props.history.replace('/checkout/contact-data')

  render() {
    let summary = <Redirect to="/" />
    if (this.props.ingredients) {
      const redirect = this.props.redirect ? <Redirect to="/orders" /> : null
      summary = (
        <>
          {redirect}
          <CheckoutSummary
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler}
            ingredients={this.props.ingredients}
          />
          <Route
            path={this.props.match.path + '/contact-data'}
            component={ContactData}
          />
        </>
      )
    }
    return summary
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burger.ingredients,
    redirect: state.orders.redirect,
  }
}

export default connect(mapStateToProps)(Checkout)
