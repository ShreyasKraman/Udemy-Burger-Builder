import React, {Component} from 'react';

import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

class Orders extends Component {

    state={
        orders:[],
        loading:false,
    }

    componentDidMount(){
        axios.get('/orders.json')
        .then(res => {
            let fetched = [];
            for(let key in res.data){
                fetched.push({
                    ...res.data[key],
                    id:key,
                })
            }

            this.setState({loading:false,orders:fetched});
        })
        .catch(err => {
            this.setState({loading:false});
        })
    }

    render(){

        let order = (this.state.orders.map(order=>{
            return <Order 
                     key={order.id} 
                     ingredients={order.ingredients} 
                     price={order.price}/>
        }));

        if(this.state.orders.length === 0)
            order = <p><strong>You have not placed any orders yet!</strong></p>

        return(
            <div>
               <h3>Your Orders</h3>
               {order}
            </div>
        );
    }
}

export default withErrorHandler(Orders,axios);