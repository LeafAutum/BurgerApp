import React, {Component} from 'react';
import { render } from 'react-dom';
import Classes from './order.css';


const Order =(props) =>{

  let ingredients= [];
  for (let name in props.ingredients){
       ingredients.push({
         name:name,
         amount:props.ingredients[name]
       })
  }

  const ingredientsData = ingredients.map(ig =>{
    return <span style={{
              textTransform:'capitalize',
              display:'inline-block',
              border:'1px solid #ccc',
              margin :'0 8px',
              padding : '5px'
    } }>
      {ig.name}({ig.amount})
      </span>
  });
  console.log(ingredientsData,ingredients,props)
  return(
  <div className ={Classes.Order}>
      <p>IngredientsData: {ingredientsData}</p>
      <p>Total Price {Number.parseFloat(props.price.toFixed(2))}</p>
  </div>
  )};



export default Order;