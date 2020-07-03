import React, { Component } from 'react'
import axios from '../../../axios-orders'
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import classes from './ContactData.module.css'

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    street: '',
    postcode: '',
    isLoading: false,
  }

  orderHandler = event => {
    event.preventDefault()
    this.setState({ isLoading: true })
    // recalc price on server in future
    // validation required
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: this.state.name,
        email: this.state.email,
        address: {
          street: this.state.street,
          postcode: this.state.postcode,
        },
      },
      deliveryMethod: 'fastest',
    }
    axios
      .post('/orders.json', order)
      .then(res => {
        this.setState({ isLoading: false })
        this.props.history.push('/orders')
      })
      .catch(err => {
        this.setState({ isLoading: false })
      })
  }

  nameHandler = event => {
    this.setState({ name: event.target.value })
  }
  emailHandler = event => {
    this.setState({ email: event.target.value })
  }
  streetHandler = event => {
    this.setState({ street: event.target.value })
  }
  postcodeHandler = event => {
    this.setState({ postcode: event.target.value })
  }

  render() {
    let form = (
      <form>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={this.state.name}
          onChange={this.nameHandler}
        ></input>
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={this.state.email}
          onChange={this.emailHandler}
        ></input>
        <input
          type="text"
          name="street"
          placeholder="Street"
          value={this.state.street}
          onChange={this.streetHandler}
        ></input>
        <input
          type="text"
          name="postcode"
          placeholder="Postcode"
          value={this.state.postcode}
          onChange={this.postcodeHandler}
        ></input>
      </form>
    )
    if (this.state.isLoading) {
      form = <Spinner />
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
        <Button clicked={this.orderHandler} btnType="Success">
          ORDER
        </Button>
      </div>
    )
  }
}

export default ContactData
