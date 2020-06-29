import React, { Component } from 'react'
import axios from '../../axios-orders'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../Hoc/withErrorHandler/withErrorHandler'

const INGREDIENTS_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  bacon: 0.7,
  meat: 1.3,
}

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4.5,
    purchaseable: false,
    isOrdered: false,
    loading: false,
  }

  componentDidMount() {
    axios
      .get('https://react-burger-builder-679aa.firebaseio.com/ingredients.json')
      .then(res => {
        this.setState({ ingredients: res.data })
      })
  }

  orderNowHandler = () => {
    const currentStatus = this.state.isOrdered
    this.setState({ isOrdered: !currentStatus })
  }

  updatePurchaseState = ingredients => {
    const sum = Object.values(ingredients).reduce((acc, cur) => acc + cur)
    this.setState({ purchaseable: sum > 0 })
  }

  confirmPurchaseHandler = () => {
    this.setState({ loading: true })
    const order = {
      ingredients: this.state.ingredients,
      // recalc price on server in future
      price: this.state.totalPrice,
      customer: {
        name: 'Karl W',
        address: {
          street: 'Fox Lane',
          postcode: 'N134AP',
          country: 'UK',
        },
        email: 'karlwarner.dev@gmail.com',
      },
      deliveryMethod: 'fastest',
    }
    axios
      .post('/orders.json', order)
      .then(res => {
        this.setState({ loading: false, isOrdered: false })
      })
      .catch(err => {
        this.setState({ loading: false, isOrdered: false })
      })
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

    let orderSummary = null
    let burger = <Spinner></Spinner>

    if (this.state.ingredients) {
      burger = (
        <>
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
      orderSummary = (
        <OrderSummary
          totalPrice={this.state.totalPrice}
          ingredients={this.state.ingredients}
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
        <Modal show={this.state.isOrdered} toggle={this.orderNowHandler}>
          {orderSummary}
        </Modal>
        {burger}
        {orderSummary}
      </>
    )
  }
}

export default withErrorHandler(BurgerBuilder, axios)
