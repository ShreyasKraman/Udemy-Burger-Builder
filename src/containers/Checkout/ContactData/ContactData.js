import React, {Component} from 'react'
import Button from '@material-ui/core/Button/Button';

import Input from '../../../components/UI/Input/Input';

import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/spinner';
import classes from './ContactData.css';

import {connect} from 'react-redux';

class ContactData extends Component{

    state = {
        orderForm:{
            name: {
                elementType:'input',
                elementConfig:{
                     type:'text',
                     placeholder: 'Your Name',
                },
                validation:{
                    required:'true'
                },
                touched:false,
                valid:false,
                value:''
            },
            email: {
                elementType:'input',
                elementConfig:{
                     type:'text',
                     placeholder: 'Your Email',
                },
                validation:{
                    required:'true'
                },
                touched:false,
                valid:false,
                value:''
            },
            street: {
                elementType:'input',
                elementConfig:{
                     type:'text',
                     placeholder: 'Your Street Address',
                },
                validation:{
                    required:'true'
                },
                touched:false,
                valid:false,
                value:''
            },
            zipcode: {
                elementType:'input',
                elementConfig:{
                     type:'text',
                     placeholder: 'Zipcode',
                },
                touched:false,
                valid:false,
                validation:{
                    required:'true',
                    minLength:5,
                    maxLength:5,
                },
                value:''
            },
            country: {
                elementType:'input',
                elementConfig:{
                     type:'text',
                     placeholder: 'Country Name',
                },
                validation:{
                    required:'true'
                },
                touched:false,
                valid:false,
                value:''
            },
            deliveryMethod: {
                elementType:'select',
                elementConfig:{
                     options: [
                         {value:'Fastest', displayValue: 'Fastest'},
                         {value: 'Cheapest', displayValue: 'Cheapest'}
                    ]
                },
                validation:{},
                valid:true,
                value:'Fastest'
            },
        },
        formIsValid:false,
        loading:false,
    }

    orderHandler = (event) => {
        event.preventDefault();

        this.setState({loading:true});

        const orderForm = {};
        for(let formElement in this.state.orderForm){
            orderForm[formElement] = this.state.orderForm[formElement].value;
        }

        const order = {
            ingredients:this.props.ings,
            price:this.props.tprice,
            orderData:orderForm
        }

        axios.post('/orders.json', order)
            .then(response=>{
                this.setState({loading:false, purchase:false});
                console.log(response);
                this.props.history.push('/');
            }).catch(error =>{
                this.setState({loading:false, purchase: false});
            });

    }

    checkValidtity = (value,rules) =>{
        
        let isValid = true;

        if(rules.required)
            isValid = value.trim() !== "" && isValid;

        if(rules.minLength)
            isValid = (value.trim().length >= rules.minLength) && isValid;
        
        if(rules.maxLength)
            isValid = (value.trim().length <= rules.maxLength) && isValid;
 
        return isValid;
    }

    inputChangedHandler = (event, inputId) => {

        const updatedOrderForm = {...this.state.orderForm};

        const updatedInputIdentifier = {...updatedOrderForm[inputId]};

        updatedInputIdentifier.valid = this.checkValidtity(event.target.value,updatedInputIdentifier.validation);
        updatedInputIdentifier.touched = true;
        updatedInputIdentifier.value = event.target.value;
        updatedOrderForm[inputId] = updatedInputIdentifier;

        let formIsValid = true;
        for(let ele in updatedOrderForm){
            formIsValid = updatedOrderForm[ele].valid && formIsValid;
        }

        this.setState({orderForm:updatedOrderForm,formIsValid:formIsValid});
    }

    render(){

        const formElementsArray = [];
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id:key,
                config: this.state.orderForm[key]
            });
        }

        let form = (
            <form>  
                {formElementsArray.map(ele=> {
                    return <Input
                                key={ele.id} 
                                elementType={ele.config.elementType} 
                                elementConfig={ele.config.elementConfig} 
                                value={ele.config.value}
                                inValid={!ele.config.valid}
                                shouldValidate={ele.config.validation}
                                touched={ele.config.touched}
                                inputChanged={(event) => this.inputChangedHandler(event,ele.id)}/>
                })}
                <Button variant="contained" color="primary" disabled={!this.state.formIsValid} onClick={this.orderHandler}>Order</Button>
            </form>
        );
        if(this.state.loading)
            form = <Spinner/>

        return(
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        ings:state.ingredients,
        tprice:state.totalPrice
    }
}

export default connect(mapStateToProps)(ContactData);