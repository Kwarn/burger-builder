import React from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './Sidedraw.module.css'

const sideDraw = (props) => {
  
  return(

    <div className={classes.Sidedraw}>
      <Logo/>
      <nav>
        <NavigationItems/>
      </nav>
    </div>
  )
}

export default sideDraw
