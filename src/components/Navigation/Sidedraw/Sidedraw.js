import React from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './Sidedraw.module.css'
import Backdrop from '../../UI/Backdrop/Backdrop'

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
