import React, { useEffect } from 'react'
import axios from '../../axios-orders'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'
import withErrorHandler from '../../Hoc/withErrorHandler/withErrorHandler'
import Spinner from '../../components/UI/Spinner/Spinner'
import Order from '../../components/Order/Order'

const Orders = props => {
  const { onFetchOrders, token, userId } = props
  useEffect(() => {
    onFetchOrders(token, userId)
  }, [onFetchOrders, token, userId])

  let orders = <Spinner />
  if (props.orders) {
    orders = props.orders.map(order => (
      <Order
        key={order.id}
        ingredients={order.ingredients}
        totalPrice={order.totalPrice}
        orderDate={order.orderDate}
      />
    ))
  }
  return <div>{orders}</div>
}

const mapStateToProps = state => {
  return {
    orders: state.orders.orders,
    token: state.auth.token,
    userId: state.auth.userId,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token, userId) =>
      dispatch(actions.fetchOrders(token, userId)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios))
