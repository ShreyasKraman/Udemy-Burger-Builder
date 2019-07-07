import React, {Component} from 'react'
import Button from '@material-ui/core/Button/Button';

import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/spinner';
import classes from './ContactData.css';

class ContactData extends Component{

    state = {
        name:'',
        email:'',
        address: {
            street:'',
            postalCode:'',
        },
        loading:false,
    }

    orderHandler = (event) => {
        event.preventDefault();

        this.setState({loading:true});

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: {
                name: 'Shr',
                email: 'shr@gmail.com',
                address: {
                    street: '1805 Biylston Street',
                    zipcode: '02134',
                },
                deliveryMethod: 'fasters',
            }
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

    render(){
        let form = (
            <form>
                    <input className={classes.Input} type="text" placeholder="username"/>
                    <input className={classes.Input} type="email" placeholder="email"/>
                    <input className={classes.Input} type="text" placeholder="street address"/>
                    <input className={classes.Input} type="text" placeholder="pincode"/>
                    <Button variant="contained" color="primary" onClick={this.orderHandler}>Order</Button>
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

export default ContactData;