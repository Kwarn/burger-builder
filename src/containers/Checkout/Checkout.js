import React from 'react'
import { Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'

const Checkout = props => {
  const checkoutCancelledHandler = () => props.history.goBack()

  const checkoutContinuedHandler = () =>
    props.history.replace('/checkout/contact-data')

  // redirects user if /contact-data is accessed via URL and burger ingredients is empty
  // redirects user to '/orders' when order is successfully posted to db

  let summary = <Redirect to="/" />
  if (props.ingredients) {
    const shouldRedirect = props.shouldRedirect ? (
      <Redirect to="/orders" />
    ) : null

    summary = (
      <>
        {shouldRedirect}
        <CheckoutSummary
          checkoutCancelled={checkoutCancelledHandler}
          checkoutContinued={checkoutContinuedHandler}
          ingredients={props.ingredients}
        />
        <Route
          path={props.match.path + '/contact-data'}
          component={ContactData}
        />
      </>
    )
  }
  return summary
}

const mapStateToProps = state => {
  return {
    ingredients: state.burger.ingredients,
    shouldRedirect: state.orders.shouldRedirect,
  }
}

export default withRouter(connect(mapStateToProps)(Checkout))
