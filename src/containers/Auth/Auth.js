import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import * as actions from '../../store/actions/index'
import { updateObject } from '../../shared/utility'
import { validateInput } from '../../shared/validation'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import Spinner from '../../components/UI/Spinner/Spinner'
import classes from './Auth.module.css'

const Auth = props => {
  const [controls, setControls] = useState({
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
  })

  const [isSignup, setIsSignup] = useState(true)
  const { isPurchasable, redirectPathOnLogin, onSetRedirectPathOnLogin } = props

  useEffect(() => {
    if (!isPurchasable && redirectPathOnLogin !== '/')
      onSetRedirectPathOnLogin('/')
  }, [isPurchasable, redirectPathOnLogin, onSetRedirectPathOnLogin])

  const inputChangedHandler = (event, controlName) => {
    const updatedControl = updateObject(controls[controlName], {
      value: event.target.value,
      valid: validateInput(
        event.target.value,
        controls[controlName].validation
      ),
      touched: true,
    })

    const updatedControls = updateObject(controls, {
      [controlName]: updatedControl,
    })

    setControls(updatedControls)
  }

  const submitHandler = event => {
    event.preventDefault()
    props.onAuth(controls.email.value, controls.password.value, isSignup)
  }

  const switchAuthModeHandler = () => {
    setIsSignup(!isSignup)
  }

  const formElementsArray = []
  for (let key in controls) {
    formElementsArray.push({
      id: key,
      config: controls[key],
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
      changed={event => inputChangedHandler(event, elem.id)}
    />
  ))

  if (props.isLoading) form = <Spinner />

  let redirect = null
  if (props.isAuth) {
    redirect = <Redirect to={props.redirectPathOnLogin} />
  }

  let errorMessage = null
  if (props.error) {
    errorMessage = <p>{props.error.message}</p>
  }

  return (
    <div className={classes.Auth}>
      {redirect}
      <h1>{isSignup ? 'SIGN-UP' : 'SIGN-IN'}</h1>
      <Button clicked={switchAuthModeHandler} btnType="Danger">
        Switch to {isSignup ? 'Sign in' : 'Sign up'}
      </Button>
      <form onSubmit={submitHandler}>
        {errorMessage}
        {form}
        <Button btnType="Success">Submit</Button>
      </form>
    </div>
  )
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
