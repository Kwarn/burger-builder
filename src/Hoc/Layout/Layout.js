import React, { Component } from 'react'
import { connect } from 'react-redux'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import Sidedraw from '../../components/Navigation/Sidedraw/Sidedraw'
import classes from './Layout.module.css'

class Layout extends Component {
  state = {
    showSideDraw: false,
  }

  sideDrawHandler = () => {
    this.setState(prevState => {
      return { showSideDraw: !prevState.showSideDraw }
    })
  }

  render() {
    return (
      <>
        <Toolbar
          toggleSideDraw={this.sideDrawHandler}
          isAuth={this.props.isAuth}
        />
        <Sidedraw
          open={this.state.showSideDraw}
          toggle={this.sideDrawHandler}
          isAuth={this.props.isAuth}
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
