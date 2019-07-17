import React, {Component} from 'react'
import {connect} from 'react-redux';

import axios from '../../axios-orders'

import Aux from '../../hoc/Auxillary/Auxillary';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/spinner';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component{

    state = {
        purchase: false,
        loading: false,
        error: null,
    }

    componentDidMount(){
        // axios.get("https://burgerbuilder-a32f2.firebaseio.com/ingredients.json")
        //     .then(response=>{
        //         this.setState({ingredients:response.data});
        //         console.log(response);  
        //     }).catch(error=>{
        //         this.setState({error: error.message});
        //     });
    }

    updatePurchaseState = (ingredients) => {
        
        const sum = Object.keys(ingredients)
                        .map( igKey => {
                            return ingredients[igKey];
                        })
                        .reduce( (sum,el) => {
                            return sum + el;
                        }, 0);
        
        return sum > 0;
        
    }

    purchaseHandler = () => {
        this.setState({purchase:true});
    }

    closeHandler = () => {
        this.setState({purchase:false});
    }

    continueHandler = () => {
        this.props.history.push({
            pathname:'/checkout',
        });
    }

    render () {

        const disableInfo = {
            ...this.props.ings
        }

        for(let key in disableInfo){
            disableInfo[key] = disableInfo[key] <=0;
        }

        let burger = this.state.error != null ? "Ingredients could not be loaded" : <Spinner/>;
        let orderSummary = null;

        if(this.props.ings){
           burger =  
                (<Aux>
                    <Burger 
                        ingredients={this.props.ings} 
                        totalPrice={this.props.tprice}    
                    />
                    <BuildControls 
                        ingredientAdd={this.props.onIngredientAdded} 
                        ingredientRemove={this.props.onIngredientRemove}
                        disabled={disableInfo}
                        totalPrice={this.props.tprice}
                        purchaseable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                    />
                </Aux>);

                orderSummary = <OrderSummary 
                                ingredients={this.props.ings} 
                                close={this.closeHandler}
                                continue={this.continueHandler}
                                price={this.props.tprice}/>;
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

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        tprice: state.totalPrice
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingName) => dispatch({type:actionTypes.ADD_INGREDIENT, ingredientName:ingName}),
        onIngredientRemove: (ingName) => dispatch({type:actionTypes.REMOVE_INGREDIENT, ingredientName:ingName}),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axios));