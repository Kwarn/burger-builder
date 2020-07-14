import React from 'react'
import BuildControl from './BuildControl/BuildControl'
import classes from './BuildControls.module.css'

// creates a set of build controls for adding/removing each ingredient
// controls.type is case sensitive, used as object key to inc/dec ingredient count
const controls = [
  { iName: 'Salad', type: 'salad' },
  { iName: 'Cheese', type: 'cheese' },
  { iName: 'Bacon', type: 'bacon' },
  { iName: 'Meat', type: 'meat' },
]

const buildControls = props => (
  <div className={classes.BuildControls}>
    <p>
      Total: <strong>£{props.totalPrice.toFixed(2)}</strong>
    </p>
    {controls.map(control => (
      <BuildControl
        key={control.iName}
        iName={control.iName}
        addIngredient={() => props.addIngredient(control.type)}
        removeIngredient={() => props.removeIngredient(control.type)}
        disabled={props.disabled[control.type]}
      />
    ))}
    <button
      disabled={!props.purchase}
      onClick={props.ordered}
      className={classes.OrderButton}
    >
      {props.isAuth ? 'ORDER NOW' : 'SIGN UP TO CONTINUE' }
    </button>
  </div>
)

export default buildControls
