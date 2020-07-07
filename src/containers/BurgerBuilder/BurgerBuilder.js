import React, { Component } from 'react'
import * as actions from '../../store/actions'
import axios from '../../axios-orders'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../Hoc/withErrorHandler/withErrorHandler'
import { connect } from 'react-redux'

class BurgerBuilder extends Component {
  state = {
    isModalOpen: false,
    loading: false,
    error: false,
  }

  orderNowHandler = () => {
    const currentStatus = this.state.isModalOpen
    this.setState({ isModalOpen: !currentStatus })
  }

  confirmPurchaseHandler = () => {
    let queryParams = []
    for (let key of Object.keys(this.props.ingredients))
      queryParams.push(`${key}=${this.props.ingredients[key]}`)

    this.props.history.push(
      `/checkout/?${queryParams.join(
        '&'
      )}&price=${this.state.totalPrice.toFixed(2)}`
    )
  }

  render() {
    const disabledInfo = {
      ...this.props.ingredients,
    }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] === 0
    }

    let orderSummary = null

    let burger = this.state.error ? (
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
          confirmPurchase={this.confirmPurchaseHandler}
        />
      )
    }

    if (this.state.loading) {
      orderSummary = <Spinner />
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
    ingredients: state.ingredients,
    totalPrice: state.totalPrice,
    purchaseable: state.purchaseable,
  }
}
const mapDipatchToProps = dispatch => {
  return {
    onAddIngredient: iName =>
      dispatch({ type: actions.ADD_INGREDIENT, ingredientName: iName }),
    onRemoveIngredient: iName =>
      dispatch({ type: actions.REMOVE_INGREDIENT, ingredientName: iName }),
  }
}
export default connect(
  mapStateToProps,
  mapDipatchToProps
)(withErrorHandler(BurgerBuilder, axios))
