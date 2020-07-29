import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import axios from '../../axios-orders'
import * as actions from '../../store/actions/index'
import withErrorHandler from '../../Hoc/withErrorHandler/withErrorHandler'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Burger from '../../components/Burger/Burger'
import Modal from '../../components/UI/Modal/Modal'
import Spinner from '../../components/UI/Spinner/Spinner'

const BurgerBuilder = props => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { ingredients, onInitIngredients } = props

  useEffect(() => {
    if (!ingredients) onInitIngredients()
  }, [ingredients, onInitIngredients])

  // controls toggling of orderSummary modal
  const orderNowHandler = () => {
    if (props.isAuth) {
      setIsModalOpen(!isModalOpen)
    } else {
      props.onSetRedirectPathOnLogin('/checkout')
      props.history.push('/login')
    }
  }

  // starts "tracking" checkout process. When complete we can redirect the user
  // eventually an async push to db completes and 'state.orders.redirect' will be set to true
  const continuePurchaseHandler = () => {
    props.onInitPurchase()
    props.history.push('/checkout')
  }

  // conditionally renders UI Elements - Spinner while waiting for db.get()
  // Error <div> when error - otherwise burger & buildcontrols & orderSummary modal

  const disabledInfo = {
    ...props.ingredients,
  }
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] === 0
  }

  let orderSummary = null

  let burger = props.error ? (
    <p style={{ textAlign: 'center' }}>Error Fetching Ingredients</p>
  ) : (
    <Spinner></Spinner>
  )

  if (props.ingredients) {
    burger = (
      <>
        <Burger ingredients={props.ingredients} />
        <BuildControls
          totalPrice={props.totalPrice}
          addIngredient={iName => props.onAddIngredient(iName)}
          removeIngredient={iName => props.onRemoveIngredient(iName)}
          disabled={disabledInfo}
          purchase={props.isPurchasable}
          ordered={orderNowHandler}
          isAuth={props.isAuth}
        />
      </>
    )
    orderSummary = (
      <OrderSummary
        totalPrice={props.totalPrice}
        ingredients={props.ingredients}
        cancelPurchase={orderNowHandler}
        confirmPurchase={continuePurchaseHandler}
      />
    )
  }

  return (
    <>
      <Modal show={isModalOpen} close={orderNowHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </>
  )
}

const mapStateToProps = state => {
  return {
    ingredients: state.burger.ingredients,
    totalPrice: state.burger.totalPrice,
    isPurchasable: state.burger.isPurchasable,
    error: state.burger.error,
    isAuth: state.auth.token !== null,
  }
}
const mapDipatchToProps = dispatch => {
  return {
    onAddIngredient: iName => dispatch(actions.addIngredient(iName)),
    onRemoveIngredient: iName => dispatch(actions.removeIngredient(iName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.initPurchase()),
    onResetBurgerBuilder: () => dispatch(actions.resetBurgerBuilder()),
    onSetRedirectPathOnLogin: path => {
      dispatch(actions.setRedirectPathOnLogin(path))
    },
  }
}
export default connect(
  mapStateToProps,
  mapDipatchToProps
)(withErrorHandler(BurgerBuilder, axios))
