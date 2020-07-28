import React, { useState } from 'react'
import { connect } from 'react-redux'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import Sidedraw from '../../components/Navigation/Sidedraw/Sidedraw'
import classes from './Layout.module.css'

const Layout = props => {
  const [showSideDraw, setShowSideDraw] = useState(false)

  const sideDrawerClosedHandler = () => {
    setShowSideDraw(false)
  }

  const sideDrawToggleHandler = () => {
    setShowSideDraw(!showSideDraw)
  }

  return (
    <>
      <Toolbar isAuth={props.isAuth} toggle={sideDrawToggleHandler} />
      <Sidedraw
        isAuth={props.isAuth}
        open={showSideDraw}
        close={sideDrawerClosedHandler}
      />
      <main className={classes.Content}>{props.children}</main>
    </>
  )
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null,
  }
}

export default connect(mapStateToProps)(Layout)
