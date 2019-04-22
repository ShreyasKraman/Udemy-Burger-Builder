import React from 'react';

import Aux from '../../../hoc/Auxillary';

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
            <p>Continue to checkout?</p>
        </Aux>
    )
};

export default ordersummary;