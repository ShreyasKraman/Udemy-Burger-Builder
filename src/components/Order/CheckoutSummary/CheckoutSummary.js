import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '@material-ui/core/Button';

import classes from './CheckoutSummary.css';

const checkoutSummary = (props) => {
    
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope it tastes well</h1>
            <div style={{width:'100%',height:'300px', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button variant="contained" color="secondary" onClick={props.checkoutCancel}>Cancel</Button>
            <Button variant="contained" color="primary" onClick={props.checkoutContinue}>Continue</Button>
        </div>
    );
}

export default checkoutSummary;