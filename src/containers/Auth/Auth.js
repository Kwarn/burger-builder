import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import * as actions from '../../store/actions/index'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import Spinner from '../../components/UI/Spinner/Spinner'
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
    isSignup: true,
  }

  componentDidMount() {
    if (!this.props.isPurchasable && this.props.redirectPathOnLogin !== '/') {
      this.props.onSetRedirectPathOnLogin('/')
    }
  }

  validateInput = (value, rules) => {
    let isValid = true
    if (rules.required) isValid = value.trim() !== '' && isValid
    if (rules.minLength) isValid = value.length >= rules.minLength && isValid
    if (rules.maxLength) isValid = value.length <= rules.maxLength && isValid
    if (rules.isNumeric) isValid = /^\d+$/.test(value) && isValid
    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
      isValid = pattern.test(value) && isValid
    }
    return isValid
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.validateInput(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true,
      },
    }
    this.setState({ controls: updatedControls })
  }

  submitHandler = event => {
    event.preventDefault()
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup
    )
  }

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return { isSignup: !prevState.isSignup }
    })
  }

  render() {
    const formElementsArray = []
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key],
      })
    }

    let form = formElementsArray.map(elem => (
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
    ))

    if (this.state.isLoading) form = <Spinner />

    let redirect = null
    if (this.props.isAuth) {
      redirect = <Redirect to={this.props.redirectPathOnLogin} />
    }

    let errorMessage = null
    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>
    }

    return (
      <div className={classes.Auth}>
        {redirect}
        <h1>{this.state.isSignup ? 'SIGN-UP' : 'SIGN-IN'}</h1>
        <Button clicked={this.switchAuthModeHandler} btnType="Danger">
          Switch to {this.state.isSignup ? 'Sign in' : 'Sign up'}
        </Button>
        <form onSubmit={this.submitHandler}>
          {errorMessage}
          {form}
          <Button btnType="Success">Submit</Button>
        </form>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    isLoading: state.auth.isLoading,
    error: state.auth.error,
    isAuth: state.auth.token !== null,
    isPurchasable: state.burger.isPurchasable,
    redirectPathOnLogin: state.auth.redirectPathOnLogin,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup)),
    onSetRedirectPathOnLogin: path => {
      dispatch(actions.setRedirectPathOnLogin(path))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
