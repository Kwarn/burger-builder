import React, { Component } from 'react'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENTS_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  bacon: 0.7,
  meat: 1.3,
}

class BurgerBuilder extends Component {
  state = {
    ingredients: { salad: 0, cheese: 0, bacon: 0, meat: 0 },
    totalPrice: 4.5,
    purchaseable: false,
    isOrdered: false,
  }

  orderNowHandler = () => {
    console.log(this.state.isOrdered)
    const currentStatus = this.state.isOrdered
    this.setState({ isOrdered: !currentStatus })
  }

  updatePurchaseState = ingredients => {
    const sum = Object.values(ingredients).reduce((acc, cur) => acc + cur)
    this.setState({ purchaseable: sum > 0 })
  }

  confirmPurchaseHandler = () => {
    alert('Brought!')
  }

  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type]
    const updatedCount = oldCount + 1
    const updatedIngredients = {
      ...this.state.ingredients,
    }
    updatedIngredients[type] = updatedCount

    const oldTotal = this.state.totalPrice
    let newTotal = oldTotal + INGREDIENTS_PRICES[type]

    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newTotal,
    })
    this.updatePurchaseState(updatedIngredients)
  }

  removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type]
    if (oldCount === 0) return
    const updatedCount = oldCount - 1
    const updatedIngredients = {
      ...this.state.ingredients,
    }

    const oldTotal = this.state.totalPrice
    let newTotal = oldTotal - INGREDIENTS_PRICES[type]

    updatedIngredients[type] = updatedCount
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newTotal,
    })
    this.updatePurchaseState(updatedIngredients)
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] === 0
    }
    return (
      <>
        <Modal
          show={this.state.isOrdered}
          toggle={this.orderNowHandler}
        >
          <OrderSummary
            totalPrice={this.state.totalPrice}
            ingredients={this.state.ingredients}
            cancelPurchase={this.orderNowHandler}
            confirmPurchase={this.confirmPurchaseHandler}
          />
        </Modal>

        <Burger ingredients={this.state.ingredients} />

        <BuildControls
          totalPrice={this.state.totalPrice}
          addIngredient={this.addIngredientHandler}
          removeIngredient={this.removeIngredientHandler}
          disabled={disabledInfo}
          purchase={this.state.purchaseable}
          ordered={this.orderNowHandler}
        />
      </>
    )
  }
}

export default BurgerBuilder
