import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as actions from '../../../store/actions/index'
import { updateObject } from '../../../shared/utility'
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import classes from './ContactData.module.css'

class ContactData extends Component {
  state = {
    isFormValid: false,
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      postcode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Postcode',
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 6,
        },
        valid: false,
        touched: false,
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'Cheapest', displayValue: 'Cheapest' },
          ],
        },
        value: 'fastest',
        validation: {},
        valid: true,
      },
    },
  }

  // returns false if ANY validation rules for the input-feild fail their check
  // receives rules from each input-field's 'validation' object - orderForm[...].validation
  validateInput = (value, rules) => {
    let isValid = true
    if (rules.required) isValid = value.trim() !== '' && isValid
    if (rules.minLength) isValid = value.length >= rules.minLength && isValid
    if (rules.maxLength) isValid = value.length <= rules.maxLength && isValid
    return isValid
  }

  // creates order object for database. Initiates loading spinner.
  orderHandler = event => {
    event.preventDefault()
    const formData = {}
    for (let formKeyId in this.state.orderForm) {
      formData[formKeyId] = this.state.orderForm[formKeyId].value
    }
    const order = {
      userId: this.props.userId,
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      orderData: formData,
    }
    this.props.onToggleLoading()
    this.props.onOrderBurger(order, this.props.token)
  }

  // handles two way binding, triggers validation checks before updating local state
  // deep clones nested data to prevent direct state mutation.
  inputChangedHandler = (event, inputIdentifier) => {
    const updatedFormElement = updateObject(
      this.state.orderForm[inputIdentifier],
      {
        value: event.target.value,
        valid: this.validateInput(
          event.target.value,
          this.state.orderForm[inputIdentifier].validation
        ),
        touched: true,
      }
    )
    const updatedOrderForm = updateObject(this.state.orderForm, {
      [inputIdentifier]: updatedFormElement,
    })

    let isAllValid = true
    for (let key in updatedOrderForm) {
      isAllValid = updatedOrderForm[key].valid && isAllValid
    }

    this.setState({ orderForm: updatedOrderForm, isFormValid: isAllValid })
  }

  // conditionally renders <Spinner /> while isLoading otherwise renders all input-elements & 'ORDER' button
  render() {
    const formElementsArray = []
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      })
    }
    let form = null
    if (this.props.isLoading) {
      form = <Spinner />
    } else {
      form = (
        <form onSubmit={this.orderHandler}>
          {formElementsArray.map(formElement => (
            <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              invalid={formElement.config.valid}
              shouldValidate={formElement.config.validation}
              touched={formElement.config.touched}
              changed={event => this.inputChangedHandler(event, formElement.id)}
            ></Input>
          ))}
          <Button btnType="Success" disabled={!this.state.isFormValid}>
            ORDER
          </Button>
        </form>
      )
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Information</h4>
        {form}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burger.ingredients,
    totalPrice: state.burger.totalPrice,
    isLoading: state.orders.isLoading,
    token: state.auth.token,
    userId: state.auth.userId,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onToggleLoading: () => dispatch(actions.toggleIsLoading()),
    onOrderBurger: (order, token) =>
      dispatch(actions.postOrderToDb(order, token)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ContactData))
