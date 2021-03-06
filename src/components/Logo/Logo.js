import React from 'react'
import { Link } from 'react-router-dom'
import classes from '../Logo/Logo.module.css'

import BurgerLogo from '../../Assets/Images/burgerLogo.png'

const logo = props => (
  <Link to='/' replace>
  <div className={classes.Logo} style={{ height: props.height }}>
    <img src={BurgerLogo} alt="Muh Burger App" />
  </div>
  </Link>
)

export default logo
