import React, {Component} from 'react'
import axios from '../../axios-orders'

import Aux from '../../hoc/Auxillary/Auxillary';

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/spinner';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad : 0.5,
    cheese: 0.4,
    meat: 1.5,
    bacon: 2,
}

class BurgerBuilder extends Component{

    state = {
        ingredients: null,
        totalPrice: 4,
        purchaseable: false,
        purchase: false,
        loading: false,
        error: null,
    }

    componentDidMount(){
        axios.get("https://burgerbuilder-a32f2.firebaseio.com/ingredients.json")
            .then(response=>{
                this.setState({ingredients:response.data});
                console.log(response);  
            }).catch(error=>{
                this.setState({error: error.message});
            });
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

    continueHandler = () => {
        const queryParams = [];
        for(let i in this.state.ingredients)
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));

        queryParams.push('price='+this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname:'/checkout',
            search:'?' + queryString,
        });

    }

    render () {

        const disableInfo = {
            ...this.state.ingredients
        }

        for(let key in disableInfo){
            disableInfo[key] = disableInfo[key] <=0;
        }

        let burger = this.state.error != null ? "Ingredients could not be loaded" : <Spinner/>;
        let orderSummary = null;

        if(this.state.ingredients){
           burger =  
                (<Aux>
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
                </Aux>);

                orderSummary = <OrderSummary 
                                ingredients={this.state.ingredients} 
                                close={this.closeHandler}
                                continue={this.continueHandler}
                                price={this.state.totalPrice}/>;
        }

        if(this.state.loading){
            orderSummary = <Spinner/>;
        }

        return (
            <Aux>
                <Modal show={this.state.purchase} clicked={this.closeHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    };
}

export default WithErrorHandler(BurgerBuilder, axios);