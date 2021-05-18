import React , { Component } from 'react';
import Aux from '../../hoc/auxilary';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import Model from '../../Components/UI/Model/Model';
import axios from '../../axios-orders';
import Spinner from '../../Components/UI/Spinner/Spinner';
import WithErrorHandler from '../../Components/WithErrorHandler/withErrorHandler';

const INGREDIENTS_PRICE ={
    salad : 0.5,
    cheese : 0.4,
    bacon  : 0.6,
    meat :1.2
}


class BurgerBuilder extends Component {
    state =  {
    ingredients :null,
     
    totalprice : 4,
    purchaseable : false,
    purchasing :false,
    loading :false,
    error :false
};

componentDidMount (){
    console.log(this.props);
    axios.get('https://reactmyburger-35ac4-default-rtdb.firebaseio.com/ingrediants.json').then(
        response => {
            this.setState({ingredients: response.data});
            console.log("print ing",response.data, this.state.ingredients);
            
        }
    ).catch(
        error => {
           
            this.setState({error:true});
        } 
    )
}


   updatePurchaseableHandler = (ingrediants) => {
       const sum= Object.keys(ingrediants).map(
           igkey => {
               return ingrediants[igkey]
           }).reduce((sum,el) => {
               return sum+el;
           },0);

           this.setState({ purchaseable : sum > 0 });
           console.log('sum',sum);
   };

    addIngredientHandler = (type) =>
    {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
             ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENTS_PRICE[type];
        const oldPrice = this.state.totalprice;
        const newPrice = oldPrice + priceAddition;
        console.log(updatedIngredients[type] ,type,newPrice);
        this.setState({ingredients : updatedIngredients , totalprice : newPrice});
        this.updatePurchaseableHandler(updatedIngredients);

    };

    removeIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount - 1;
        if (oldCount <=0){
           return ;
        }
        const updatedIngredients = {
             ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENTS_PRICE[type];
        const oldPrice = this.state.totalprice;
        const newPrice = oldPrice - priceAddition;
        console.log(updatedIngredients[type] ,type,newPrice);
        this.setState({ingredients : updatedIngredients , totalprice : newPrice});
        this.updatePurchaseableHandler(updatedIngredients);
    };

    purchasingHandler = ()=>{
        this.setState({purchasing:true});
    }

    purchasecancelHandler = ()=>{
        this.setState({purchasing:false});
    }

    purchaseContinueHandler = () => {
     //alert ("purchasing continue");
     this.setState({loading:true});
    //  const order ={
    //      ingrediants : this.state.ingredients,
    //      price : this.state.totalprice,
    //      customer :{
    //          name :'idiot',
    //          address :{
    //              street :'test',
    //          },
    //          email :'gjfn@gmail.com'
    //      },
    //      deliverymethod : 'fastest'
    //  }
     
    //  axios.post('/orders.json',order).then(
    //      response =>{
    //      this.setState({loading:false,purchasing:false});
    //      console.log(response);
    //     }) .catch(
    //          error => {
    //          this.setState({loading:false,purchasing:false});
    //          console.log(error)}
    //          );
             const queryParams = [];
             for (let i in this.state.ingredients){
                 queryParams.push(encodeURIComponent(i) + '=' +encodeURIComponent(this.state.ingredients[i]));
             }
             queryParams.push('price=' + this.state.totalprice);
             const queryString = queryParams.join('&');
             this.props.history.push({
                 pathname :'/checkout',
                 search :'?'+ queryString
             });
    }

    render(){
        const disableInfo = {
            ...this.state.ingredients
        }
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0 ;
        }

        let orderSummary =null;

       console.log("ingre",this.state.ingredients);
        console.log('purchasable' ,this.state.purchaseable, 'purchasing', this.state.purchasing,this.state.totalprice);
        
        let burger = this.state.error ? <p>NO Ingrediants</p>:<Spinner/> 
        if(this.state.ingredients){
        burger = <Aux>
                <Burger ingredients= {this.state.ingredients}/>
              <BuildControls ingredientsadded = {this.addIngredientHandler} 
              ingredientsremove= {this.removeIngredientHandler}
              disableInfo={disableInfo}  price= {this.state.totalprice.toFixed(2)} 
              ordered={this.purchasingHandler}
              purchaseable = {this.state.purchaseable}/>
        </Aux>
        orderSummary =  <OrderSummary ingrediants={this.state.ingredients} Cancel={this.purchasecancelHandler}
        Continue ={this.purchaseContinueHandler} totalPrice={this.state.totalprice.toFixed(2)}>
        </OrderSummary>
        }

        if (this.state.loading){
            orderSummary = <Spinner/>
        }
        return (
          <Aux>
              <Model show={this.state.purchasing} modelclosed ={this.purchasecancelHandler}>
                  {orderSummary}
              </Model>
              {burger}
          </Aux>

        );
    }
}

export default WithErrorHandler(BurgerBuilder,axios);