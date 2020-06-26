import React from 'react'
import classes from './Layout.module.css'
import Toolbar from '../Navigation/Toolbar/Toolbar' 
import Sidedraw from '../Navigation/Sidedraw/Sidedraw' 

const layout = props => (
  <>
    <Toolbar/>
    <Sidedraw/>
    <main className={classes.Content}>{props.children}</main>
  </>
)

export default layout
