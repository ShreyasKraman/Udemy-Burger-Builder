import React, {Component} from 'react'

import Aux from '../../hoc/Auxillary';

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import IngredientSummary from '../../components/Burger/OrderSummary/OrderSummary';

import Button from '@material-ui/core/Button';

const INGREDIENT_PRICES = {
    salad : 0.5,
    cheese: 0.4,
    meat: 1.5,
    bacon: 2,
}

class BurgerBuilder extends Component{

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
        },
        totalPrice: 4,
        purchaseable: false,
        purchase: false,
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount; 
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount > 0){
            const updatedCount = oldCount - 1;
            const updatedIngredients = {
                ...this.state.ingredients
            };
            updatedIngredients[type] = updatedCount;
            const priceSubtraction = INGREDIENT_PRICES[type];
            const oldPrice = this.state.totalPrice;
            const newPrice = oldPrice - priceSubtraction;
            this.setState({totalPrice:newPrice,ingredients: updatedIngredients});
            this.updatePurchaseState(updatedIngredients);
        }
    }

    updatePurchaseState = (ingredients) => {
        
        let purchaseable = false;
        for(let key in ingredients){
            if(ingredients[key] > 0){
                purchaseable = true;
                break;
            }
        }
        this.setState({purchaseable: purchaseable});
    }

    purchaseHandler = () => {
        this.setState({purchase:true});
    }

    closeHandler = () => {
        this.setState({purchase:false});
    }

    render () {

        const disableInfo = {
            ...this.state.ingredients
        }

        for(let key in disableInfo){
            disableInfo[key] = disableInfo[key] <=0;
        }

        return (
            <Aux>
                <Modal show={this.state.purchase} clicked={this.closeHandler}>
                    <IngredientSummary ingredients={this.state.ingredients}/>
                    <Button 
                        variant="contained" 
                        color="secondary" 
                        onClick={this.closeHandler}>Close</Button>
                </Modal>

                <Burger 
                    ingredients={this.state.ingredients} 
                    totalPrice={this.state.totalPrice}    
                />
                <BuildControls 
                    ingredientAdd={this.addIngredientHandler} 
                    ingredientRemove={this.removeIngredientHandler}
                    disabled={disableInfo}
                    totalPrice={this.state.totalPrice}
                    purchaseable={this.state.purchaseable}
                    ordered={this.purchaseHandler}
                />
            </Aux>
        );
    };
}

export default BurgerBuilder;