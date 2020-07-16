import React, { Component } from 'react'
import { Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'

class Checkout extends Component {
  checkoutCancelledHandler = () => this.props.history.goBack()

  checkoutContinuedHandler = () =>
    this.props.history.replace('/checkout/contact-data')

  // redirects user if /contact-data is accessed via URL and burger ingredients is empty
  // redirects user to '/orders' when order is successfully posted to db
  render() {
    let summary = <Redirect to="/" />
    if (this.props.ingredients) {
      const shouldRedirect = this.props.shouldRedirect ? (
        <Redirect to="/orders" />
      ) : null

      summary = (
        <>
          {shouldRedirect}
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
    shouldRedirect: state.orders.shouldRedirect,
  }
}

export default withRouter(connect(mapStateToProps)(Checkout))
