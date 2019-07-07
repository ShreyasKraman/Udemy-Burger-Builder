import React from 'react';

import classes from './Order.css'

const Order = (props) => {

    // const ingredients = Object.keys(props.ingredients)
    //                         .map(ingKey => {
    //                             return [...Array(props.ingredients[ingKey])].map((_,i) => {
    //                                 return <li key={i}></li>
    //                             });
    //                         })
    //                         .reduce((arr,el)=>{
    //                             return arr.concat(el)
    //                         },[]);


    const ingredients = [];
    for(let ingredientName in props.ingredients){
        ingredients.push({
            name: ingredientName,
            price:props.ingredients[ingredientName], 
        });
    }

    const ingredientOp = ingredients.map((ig,idx) => {
        return <span
                style={{textTransform:'capitalize',display:'inline-block',margin:'0 8px',border:'1px solid #ccc',padding:'5px'}} 
                key={idx}>{ig.name} ({ig.price})</span>;
    })

    return(
        <div className={classes.Order}>
            <p>Ingredients: 
                {ingredientOp}
            </p>
            <p>Price: <strong>{Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    );
};

export default Order;