import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from '../../axios-orders'
import * as actions from '../../store/actions/index'
import withErrorHandler from '../../Hoc/withErrorHandler/withErrorHandler'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Burger from '../../components/Burger/Burger'
import Modal from '../../components/UI/Modal/Modal'
import Spinner from '../../components/UI/Spinner/Spinner'

class BurgerBuilder extends Component {
  state = {
    isModalOpen: false,
  }

  // fetches ingredients from db
  componentDidMount() {
    this.props.onInitIngredients()
  }

  // controls toggling of orderSummary modal
  orderNowHandler = () => {
    const currentStatus = this.state.isModalOpen
    this.setState({ isModalOpen: !currentStatus })
  }

  // starts "tracking" checkout process. When complete we can redirect the user
  // eventually an async push to db completes and 'state.orders.redirect' will be set to true 
  continuePurchaseHandler = () => {
    this.props.onInitPurchase()
    this.props.history.push('/checkout')
  }

  // conditionally renders UI Elements - Spinner while waiting for db.get()
  // Error <div> when error - otherwise burger & buildcontrols & orderSummary modal
  render() {
    const disabledInfo = {
      ...this.props.ingredients,
    }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] === 0
    }

    let orderSummary = null

    let burger = this.props.error ? (
      <p style={{ textAlign: 'center' }}>Error Fetching Ingredients</p>
    ) : (
      <Spinner></Spinner>
    )

    if (this.props.ingredients) {
      burger = (
        <>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            totalPrice={this.props.totalPrice}
            addIngredient={iName => this.props.onAddIngredient(iName)}
            removeIngredient={iName => this.props.onRemoveIngredient(iName)}
            disabled={disabledInfo}
            purchase={this.props.purchaseable}
            ordered={this.orderNowHandler}
          />
        </>
      )
      orderSummary = (
        <OrderSummary
          totalPrice={this.props.totalPrice}
          ingredients={this.props.ingredients}
          cancelPurchase={this.orderNowHandler}
          confirmPurchase={this.continuePurchaseHandler}
        />
      )
    }

    return (
      <>
        <Modal show={this.state.isModalOpen} toggle={this.orderNowHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burger.ingredients,
    totalPrice: state.burger.totalPrice,
    purchaseable: state.burger.purchaseable,
    error: state.burger.error,
  }
}
const mapDipatchToProps = dispatch => {
  return {
    onAddIngredient: iName => dispatch(actions.addIngredient(iName)),
    onRemoveIngredient: iName => dispatch(actions.removeIngredient(iName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.initPurchase()),
  }
}
export default connect(
  mapStateToProps,
  mapDipatchToProps
)(withErrorHandler(BurgerBuilder, axios))
