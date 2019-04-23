import React from 'react';

import Aux from '../../../hoc/Auxillary';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const ordersummary = (props) => {

    const ingredients = Object.keys(props.ingredients)
                .map(igKey => {
                    return <li key={igKey}>
                                <span style={{textTransform:'capitalize'}}>
                                    {igKey}
                                </span>
                                :{props.ingredients[igKey]}
                            </li>;
                });     
    return(
        <Aux>
            <h3>Your Order Summary</h3>
            <p>Following are ingredients in your delicious burger</p>
            <ul>{ingredients}</ul>
            <h3>Total price: $ {props.price.toFixed(2)}</h3>
            <p>Continue to checkout?</p>
            <Grid container spacing={24}>
                <Grid item xs={4}>
                    <Button 
                        variant="contained" 
                        color="secondary" 
                        onClick={props.close}>Cancel</Button>
                </Grid>
                <Grid item xs={4}>
                    <Button
                        varaint="contained"
                        color="primary"
                        onClick={props.continue}>Continue</Button>
                </Grid>
            </Grid>
        </Aux>
    )
};

export default ordersummary;