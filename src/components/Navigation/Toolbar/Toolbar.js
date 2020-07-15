import React from 'react'
import DrawToggle from '../Sidedraw/Menu/DrawToggle'
import NavigationItems from '../NavigationItems/NavigationItems'
import Logo from '../../Logo/Logo'
import classes from './Toolbar.module.css'

const toolbar = props => (
  <header className={classes.Toolbar}>
    <DrawToggle toggle={props.toggle} />
    <div className={classes.Logo}>
      <Logo />
    </div>
    <nav className={classes.DesktopOnly}>
      <NavigationItems isAuth={props.isAuth} />
    </nav>
  </header>
)

export default toolbar
