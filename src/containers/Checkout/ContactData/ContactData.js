import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from '../../../axios-orders'
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import classes from './ContactData.module.css'

class ContactData extends Component {
  state = {
    isLoading: false,
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

  validateInput = (value, rules) => {
    let isValid = true
    if (rules.required) isValid = value.trim() !== '' && isValid
    if (rules.minLength) isValid = value.length >= rules.minLength && isValid
    if (rules.maxLength) isValid = value.length <= rules.maxLength && isValid
    return isValid
  }

  orderHandler = event => {
    event.preventDefault()
    this.setState({ isLoading: true })
    // recalc price on server in future
    // validation required
    const formData = {}
    for (let formKeyId in this.state.orderForm) {
      formData[formKeyId] = this.state.orderForm[formKeyId].value
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      orderData: formData,
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

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...this.state.orderForm,
    }
    const updatedNestedKeys = {
      ...updatedOrderForm[inputIdentifier],
    }

    updatedNestedKeys.value = event.target.value
    updatedNestedKeys.valid = this.validateInput(
      updatedNestedKeys.value,
      updatedNestedKeys.validation
    )
    updatedNestedKeys.touched = true
    updatedOrderForm[inputIdentifier] = updatedNestedKeys

    let isAllValid = true
    for (let key in updatedOrderForm) {
      isAllValid = updatedOrderForm[key].valid && isAllValid
    }

    this.setState({ orderForm: updatedOrderForm, isFormValid: isAllValid })
  }

  render() {
    const formElementsArray = []
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      })
      console.log(formElementsArray)
    }

    let form = (
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
    if (this.state.isLoading) {
      form = <Spinner />
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
    ingredients: state.ingredients,
    totalPrice: state.totalPrice,
  }
}

export default connect(mapStateToProps)(ContactData)
