import React, { Component } from 'react'
import { connect } from 'react-redux'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import Sidedraw from '../../components/Navigation/Sidedraw/Sidedraw'
import classes from './Layout.module.css'

class Layout extends Component {
  state = {
    showSideDraw: false,
  }

  sideDrawerClosedHandler = () => {
    this.setState({ showSideDraw: false })
  }

  sideDrawToggleHandler = () => {
    this.setState(prevState => {
      return { showSideDraw: !prevState.showSideDraw }
    })
  }


  render() {
    return (
      <>
        <Toolbar
          isAuth={this.props.isAuth}
          toggle={this.sideDrawToggleHandler}
        />
        <Sidedraw
          isAuth={this.props.isAuth}
          open={this.state.showSideDraw}
          close={this.sideDrawerClosedHandler}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null,
  }
}

export default connect(mapStateToProps)(Layout)
