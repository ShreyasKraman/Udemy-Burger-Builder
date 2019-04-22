import React from 'react';

import classes from './BuildControls.css';
import Button from '@material-ui/core/Button';

import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Salad', type:'salad'},
    {label: 'Cheese', type:'cheese'},
    {label: 'bacon', type: 'bacon'},
    {label: 'meat', type: 'meat'}
]

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <h2>Total Price: {props.totalPrice.toFixed(2)}</h2>
        {controls.map(ctrl => (
            <BuildControl 
                key={ctrl.label} 
                label={ctrl.label}
                added={() => props.ingredientAdd(ctrl.type)} 
                removed={() => props.ingredientRemove(ctrl.type)}
                disabled={props.disabled[ctrl.type]}  
            />
        ))}
        <Button 
            variant="contained" 
            color="primary" 
            onClick={props.ordered}
            disabled={!props.purchaseable}
        >
            ORDER NOW
        </Button> 
    </div>
);

export default buildControls;