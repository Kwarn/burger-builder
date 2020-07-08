import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from '../../axios-orders'
import * as BurgerBuilderActions from '../../store/actions/index'
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

  componentDidMount() {
    this.props.onInitIngredients()
  }

  orderNowHandler = () => {
    const currentStatus = this.state.isModalOpen
    this.setState({ isModalOpen: !currentStatus })
  }

  continuePurchaseHandler = () => {
    this.props.history.push('/checkout')
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
    ingredients: state.ingredients,
    totalPrice: state.totalPrice,
    purchaseable: state.purchaseable,
  }
}
const mapDipatchToProps = dispatch => {
  return {
    onAddIngredient: iName =>
      dispatch(BurgerBuilderActions.addIngredient(iName)),
    onRemoveIngredient: iName =>
      dispatch(BurgerBuilderActions.removeIngredient(iName)),
    onInitIngredients: () => 
      dispatch(BurgerBuilderActions.initIngredients()),
  }
}
export default connect(
  mapStateToProps,
  mapDipatchToProps
)(withErrorHandler(BurgerBuilder, axios))
