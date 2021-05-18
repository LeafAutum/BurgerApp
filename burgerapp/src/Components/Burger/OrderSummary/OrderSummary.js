import React, {Component} from 'react';
import Aux from '../../../hoc/auxilary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component{
  componentWillUpdate (){
    console.log("ordersummary update");
  }
  render(){
   const Summary = Object.keys(this.props.ingrediants).map(
       igkey => {
         return <li key={igkey}>
           <span style={{textTransform :'capitalize'}}>{igkey}</span> : { this.props.ingrediants[igkey] } 
                </li>

       }
   );


   return (
       <Aux>
       <h3>Your Order</h3>
       <p>Order ingredient</p>
       <ul>{Summary}</ul>
       <p>Continue to checkout?</p>
       <p>Total Price : {this.props.totalPrice}</p>
       <Button btnType = 'Success' clicked={this.props.Continue}>Continue</Button>
       <Button btnType= 'Danger' clicked={this.props.Cancel}>Cancel</Button>
       </Aux>
   )}
;
   }

export default OrderSummary;