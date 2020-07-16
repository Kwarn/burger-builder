import React, { Component, Suspense } from 'react'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from './store/actions/index'
import Layout from './Hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Spinner from './components/UI/Spinner/Spinner'
import Logout from './containers/Auth/Logout/Logout'
import './App.css'

const Checkout = React.lazy(() => import('./containers/Checkout/Checkout'))
const Orders = React.lazy(() => import('./containers/Orders/Orders'))
const Auth = React.lazy(() => import('./containers/Auth/Auth'))

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoLogin()
  }

  render() {
    let routes = (
      <Switch>
        <Route
          path="/login"
          render={() => (
            <Suspense fallback={Spinner}>
              <Auth />
            </Suspense>
          )}
        />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    )

    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path="/login" component={Auth} />
          <Route
            path="/checkout"
            render={() => (
              <Suspense fallback={Spinner}>
                <Checkout />
              </Suspense>
            )}
          />
          <Route
            path="/orders"
            render={() => (
              <Suspense fallback={Spinner}>
                <Orders />
              </Suspense>
            )}
          />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
          {/* <Redirect to='/' /> */}
        </Switch>
      )
    }
    return (
      <div className="App">
        <Layout>{routes}</Layout>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoLogin: () => dispatch(actions.tryAutoLogin()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
