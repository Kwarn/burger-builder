import React, { Component } from 'react'
import axios from '../../axios-orders'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'
import withErrorHandler from '../../Hoc/withErrorHandler/withErrorHandler'
import Spinner from '../../components/UI/Spinner/Spinner'
import Order from '../../components/Order/Order'

class Orders extends Component {
  // fetches orders from db
  componentDidMount() {
    this.props.onFetchOrdersHandler()
  }

  // conditionally renders Spinner/orders if fetching ingreedients is successful
  render() {
    let orders = <Spinner />
    if (this.props.orders) {
      orders = this.props.orders.map(order => (
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

const mapStateToProps = state => {
  return {
    orders: state.orders.orders,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrdersHandler: () => dispatch(actions.fetchOrders()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios))
