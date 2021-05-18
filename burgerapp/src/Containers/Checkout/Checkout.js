import React,{ Component } from 'react';
import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './Contactdata/ContactData';
import { Route } from 'react-router-dom';
import axios from '../../axios-orders';
import Spinner from '../../Components/UI/Spinner/Spinner';


class Checkout extends Component{
    state={
        ingredients :null,
        totalprice:0
    }

    // shouldComponentUpdate (next,nextState){

    //     return next.location.search !== this.props.location.search || this.props.location.search ==='';
    // }
    
    componentDidMount(){

      
        console.log(this.props);
        if(this.props.location.search === ''){
        axios.get('https://reactmyburger-35ac4-default-rtdb.firebaseio.com/ingrediants.json').then(
            response => {

        
                this.setState({ingredients:response.data});
               
               
            }
        ).catch(
            error => {
               
              console.log("error");
            } 
        )
        }else{
        
        let ingredients ={};

        const query = new URLSearchParams(this.props.location.search);
        
        console.log('ingreduants',ingredients);
     
        console.log("ingrediants data before", ingredients);
       
        let price=0;
        console.log(query,"queruu");
        for (let param of query.entries()){
    
         if(param[0] === 'price'){
            price= +param[1]
         }else{
           ingredients[param[0]] = +param[1]
         }
        }
        console.log("dataa",ingredients,!this.state.ingredients);
        this.setState({ingredients:ingredients,totalprice:price});
       
        }
    }


    

    checkoutCancelHandler =()=>{
       this.props.history.goBack();
    }

    checkoutContinueHandler =()=>{
        this.props.history.replace('/checkout/contact-data/');

    }


    render(){
       console.log(this.state.ingredients,"dsfoj");
       let checkout =<Spinner/>
 
       if(this.state.ingredients){
           
           checkout= <div>
            <CheckoutSummary checkoutCancel ={this.checkoutCancelHandler} 
            checkoutContinue={this.checkoutContinueHandler} ingredients={this.state.ingredients} />
            <Route path={this.props.match.path + '/Contact-data'} 
            render={(props) =>(<ContactData ingredients={this.state.ingredients} {...props} totalprice={this.state.totalprice}/>)}/>
       </div> 
       }
        return(
        <div>
           {checkout} 
             
           </div>
        )
    }
};

export default Checkout;