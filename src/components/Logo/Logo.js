import React from 'react'
import classes from '../Logo/Logo.module.css'

import BurgerLogo from '../../Assets/Images/burgerLogo.png'

const logo = props => (
  <div className={classes.Logo} style={{height: props.height}}>
    <img src={BurgerLogo} alt="Muh Burger App" />
  </div>
)

export default logo
