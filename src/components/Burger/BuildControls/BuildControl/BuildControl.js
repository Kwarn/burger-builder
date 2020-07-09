import React from 'react'
import classes from './BuildControl.module.css'

const buildControl = props => (
  <div className={classes.BuildControl}>
    <div className={classes.Label}>{props.iName}</div>
    <button
      disabled={props.disabled}
      onClick={props.removeIngredient}
      className={classes.Less}
    >
      Less
    </button>
    <button onClick={props.addIngredient} className={classes.More}>
      More
    </button>
  </div>
)

export default buildControl
