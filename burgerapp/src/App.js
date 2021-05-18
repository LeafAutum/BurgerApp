import React, { Component } from 'react';
import Layout from '../src/Components/Layout/Layout';
import BurgerBuilder from '../src/Containers/BurgerBuilder/BurgerBuilder';
import Checkout from './Containers/Checkout/Checkout';
import { Route} from 'react-router-dom';
import Orders from './Containers/Orders/Orders';

class App extends Component {
 render(){
  return (
    <div className="App">
      <Layout>
      <Route path='/' exact component= {BurgerBuilder}/>
      <Route path='/Orders' component ={Orders} />
      <Route path='/Checkout' component ={Checkout} />
      
      </Layout>
    </div>
  );
}}

export default App;
