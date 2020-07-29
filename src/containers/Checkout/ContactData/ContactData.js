import React, { useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as actions from '../../../store/actions/index'
import { updateObject } from '../../../shared/utility'
import { validateInput } from '../../../shared/validation'
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import classes from './ContactData.module.css'

const ContactData = props => {
  const [isFormValid, setIsFormValid] = useState(false)
  const [orderForm, setOrderForm] = useState({
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
        isEmail: true,
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
  })

  // creates order object for database. Initiates loading spinner.
  const orderHandler = event => {
    event.preventDefault()
    const formData = {}
    for (let formKeyId in orderForm) {
      formData[formKeyId] = orderForm[formKeyId].value
    }
    const order = {
      userId: props.userId,
      ingredients: props.ingredients,
      price: props.totalPrice,
      orderData: formData,
      orderDate: new Date(),
    }
    props.onToggleLoading()
    props.onOrderBurger(order, props.token)
  }

  // handles two way binding, triggers validation checks before updating local state
  // deep clones nested data to prevent direct state mutation.
  const inputChangedHandler = (event, inputIdentifier) => {
    const updatedFormElement = updateObject(orderForm[inputIdentifier], {
      value: event.target.value,
      valid: validateInput(
        event.target.value,
        orderForm[inputIdentifier].validation
      ),
      touched: true,
    })
    const updatedOrderForm = updateObject(orderForm, {
      [inputIdentifier]: updatedFormElement,
    })

    let isAllValid = true
    for (let key in updatedOrderForm) {
      isAllValid = updatedOrderForm[key].valid && isAllValid
    }
    setIsFormValid(isAllValid)
    setOrderForm(updatedOrderForm)
  }

  // conditionally renders <Spinner /> while isLoading otherwise renders all input-elements & 'ORDER' button

  const formElementsArray = []
  for (let key in orderForm) {
    formElementsArray.push({
      id: key,
      config: orderForm[key],
    })
  }
  let form = null
  if (props.isLoading) {
    form = <Spinner />
  } else {
    form = (
      <form onSubmit={orderHandler}>
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={event => inputChangedHandler(event, formElement.id)}
          ></Input>
        ))}
        <Button btnType="Success" disabled={!isFormValid}>
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
    onOrderBurger: (order, token) => dispatch(actions.postOrder(order, token)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ContactData))
