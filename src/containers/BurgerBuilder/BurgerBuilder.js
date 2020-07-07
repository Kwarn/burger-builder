import React, { Component } from 'react'
import * as actions from '../../store/actions'
import axios from '../../axios-orders'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../Hoc/withErrorHandler/withErrorHandler'
import {connect} from 'react-redux'

const INGREDIENTS_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  bacon: 0.7,
  meat: 1.3,
}

class BurgerBuilder extends Component {
  state = {
    totalPrice: 4.5,
    purchaseable: false,
    isModalOpen: false,
    loading: false,
    error: false,
  }

  componentDidMount() {
    axios
      .get('ingredients.json')
      .then(res => {
        this.setState({
          ingredients: {
            salad: res.data.salad,
            cheese: res.data.cheese,
            bacon: res.data.bacon,
            meat: res.data.meat,
          },
        })
      })
      .catch(err => {
        this.setState({ error: true })
      })
  }

  orderNowHandler = () => {
    const currentStatus = this.state.isModalOpen
    this.setState({ isModalOpen: !currentStatus })
  }

  updatePurchaseState = ingredients => {
    const sum = Object.values(ingredients).reduce((acc, cur) => acc + cur)
    this.setState({ purchaseable: sum > 0 })
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

  addIngredientHandler = type => {
    const oldCount = this.props.ingredients[type]
    const updatedCount = oldCount + 1
    const updatedIngredients = {
      ...this.props.ingredients,
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
    const oldCount = this.props.ingredients[type]
    if (oldCount === 0) return
    const updatedCount = oldCount - 1
    const updatedIngredients = {
      ...this.props.ingredients,
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
    ingrdnts: state.ingredients,
  }
}
const mapDipatchToProps = dispatch => {
  return {
    onAddIngredient: iName =>
      dispatch({ type: actions.ADD_INGREDIENT, ingredientName: iName }),
    onRemoveIngredient: (iName) => dispatch({ type: actions.REMOVE_INGREDIENT, ingredientName: iName }),
  }
}
export default connect(
  mapStateToProps,
  mapDipatchToProps
)(withErrorHandler(BurgerBuilder, axios))
