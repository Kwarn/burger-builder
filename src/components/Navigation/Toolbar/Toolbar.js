import React from 'react'
import Menu from '../Sidedraw/Menu/Menu'
import NavigationItems from '../NavigationItems/NavigationItems'
import Logo from '../../Logo/Logo'
import classes from './Toolbar.module.css'

const toolbar = props => (
  <header className={classes.Toolbar}>
    <Menu toggle={props.toggleSideDraw} />
    <div className={classes.Logo}>
      <Logo />
    </div>
    <nav className={classes.DesktopOnly}>
      <NavigationItems isAuth={props.isAuth} />
    </nav>
  </header>
)

export default toolbar
