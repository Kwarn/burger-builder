import React, { Component } from 'react'
import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../Hoc/withErrorHandler/withErrorHandler'

class Orders extends Component {
  state = {
    isLoading: false,
    orders: [],
  }

  componentDidMount() {
    this.setState({ isLoading: true })
    const orders = []
    axios
      .get('orders.json')
      .then(res => {
        for (let key in res.data) {
          orders.push({
            id: key,
            ingredients: res.data[key].ingredients,
            totalPrice: res.data[key].price,
          })
        }
        console.log(orders)
        this.setState({ isLoading: false })
      })
      .catch(err => {
        console.log(err)
        this.setState({ isLoading: false })
      })
    this.setState({ orders: orders })
  }

  render() {
    let orders = <Spinner />
    if (!this.state.isLoading) {
      orders = this.state.orders.map(order => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          totalPrice={order.totalPrice}
        />
      ))
    }

    return <div>{orders}</div>
  }
}

export default withErrorHandler(Orders, axios)
