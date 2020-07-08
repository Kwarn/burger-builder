import React from 'react'
import NavigationItems from '../NavigationItems/NavigationItems'
import Backdrop from '../../UI/Backdrop/Backdrop'
import Logo from '../../Logo/Logo'
import classes from './Sidedraw.module.css'

const sideDraw = props => {
  let attachedClasses = [classes.Sidedraw, classes.Close]
  if (props.open) {
    attachedClasses = [classes.Sidedraw, classes.Open]
  }
  return (
    <>
    <Backdrop show={props.open} toggle={props.toggle}/>
      <div className={attachedClasses.join(" ")}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </>
  )
}

export default sideDraw
