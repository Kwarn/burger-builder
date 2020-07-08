import React, { Component } from 'react'
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
