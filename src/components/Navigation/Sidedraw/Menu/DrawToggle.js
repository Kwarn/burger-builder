import React from 'react'
import classes from './DrawToggle.module.css'

const drawToggle = (props) => (
  <div className={classes.DrawToggle} onClick={props.toggle}>
    <div></div>
    <div></div>
    <div></div>
  </div>
)
export default drawToggle
  

