import React, { Component } from 'react';

import Order from '../../Components/Order/order';
import axios from '../../axios-orders';

class Orders extends Component{
    state={
        orders:[],
        loading :false
    }
  
    componentDidMount(){
       axios.get('/orders.json').then(res =>{
           const fetchedOrders =[];
           
           for (let key  in res.data){
             
               
               fetchedOrders.push({
                   ...res.data[key],
                    id : key
               })
           }
           this.setState({loading:false,orders:fetchedOrders})
          
       }).catch(err =>{
           this.setState({loading:false})
       })
    }

    render(){
        console.log(this.state.orders);
        return(
            <div>
           
            { this.state.orders.map(order => {
             
            return <Order key={order.id} ingredients ={order.ingredients} price={order.price} />
            })}
          
            </div>
        
        )
    }

};


export default Orders;