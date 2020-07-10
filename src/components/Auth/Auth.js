import React, { Component } from 'react'
import Input from '../UI/Input/Input'
import Button from '../UI/Button/Button'
import classes from './Auth.module.css'

class Auth extends Component {
  state = {
    controls: {
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
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password',
        },
        value: '',
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    },
  }
  render() {
    const formElementsArray = []
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key],
      })
    }

    const form = formElementsArray.map(elem => (
      <>
        <Input
          key={elem.id}
          elementType={elem.config.elementType}
          elementConfig={elem.config.elementConfig}
          value={elem.config.value}
          invalid={elem.config.valid}
          shouldValidate={elem.config.validation}
          touched={elem.config.touched}
          changed={event => this.inputChangedHandler(event, elem.id)}
        />
      </>
    ))
    return (
      <div className={classes.Auth}>
        <form>
          {form}
          <Button btnType="Success"> Submit </Button>
        </form>
      </div>
    )
  }
}

export default Auth
