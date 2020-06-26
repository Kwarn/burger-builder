import React from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './Sidedraw.module.css'

const sideDraw = (props) => {
  
  return(

    <div className={classes.Sidedraw}>
      <div className={classes.Logo}>
      <Logo/>
      </div>
      <nav>
        <NavigationItems/>
      </nav>
    </div>
  )
}

export default sideDraw
