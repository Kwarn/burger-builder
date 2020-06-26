import React, { Component } from 'react'
import classes from './Layout.module.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import Sidedraw from '../Navigation/Sidedraw/Sidedraw'

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
        <Toolbar toggleSideDraw={this.sideDrawHandler} />
        <Sidedraw
          open={this.state.showSideDraw}
          toggle={this.sideDrawHandler}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </>
    )
  }
}

export default Layout
