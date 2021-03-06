import React, {Component} from 'react';

import {Route} from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component{
    
    state={
        ingredients:null,
        totalPrice:0,
    }

    componentWillMount() {

        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let totalPrice = 0;
        for(let param of query.entries()){
            if(param[0] === 'price'){
                totalPrice = param[1];
                continue;
            }
            ingredients[param[0]] = +param[1];
        }
        this.setState({ingredients:ingredients,totalPrice:totalPrice});
    }
    
    checkoutCancelHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    
    render(){
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    checkoutCancel={this.checkoutCancelHandler}
                    checkoutContinue={this.checkoutContinueHandler}/>
                <Route 
                    path={this.props.match.url +"/contact-data"} 
                    render={(props) => <ContactData ingredients={this.state.ingredients} totalPrice={this.state.totalPrice} {...props} />}/>
            </div>
        );
    }
}

export default Checkout;