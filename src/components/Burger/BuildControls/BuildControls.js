import React from 'react'
import classes from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Meat', type: 'meat' },
]

const buildControls = props => (
  <div className={classes.BuildControls}>
    <p>
      Total: <strong>${props.totalPrice.toFixed(2)}</strong>
    </p>
    {controls.map(control => (
      <BuildControl
        key={control.label}
        label={control.label}
        addIngredient={() => props.addIngredient(control.type)}
        removeIngredient={() => props.removeIngredient(control.type)}
        disabled={props.disabled[control.type]}
      />
    ))}
    <button disabled={!props.purchase} onClick={props.ordered}  className={classes.OrderButton}>Order Now</button>
  </div>
)

export default buildControls
