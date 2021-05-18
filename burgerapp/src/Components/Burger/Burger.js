import React from 'react';

import classes from './Burger.css';
import BurgerIngrediant from './BurgerIngrediant/BurgerIngrediant'

const Burger = (props) =>{
    console.log("ing",props.ingredients);
    let transformedingredients = Object.keys(props.ingredients).map(
        igKey =>{
        return [...Array(props.ingredients[igKey])].map(( _ , i) =>{
           return <BurgerIngrediant key ={igKey +i} type={igKey}/>;
        })}
    ).reduce ((arr,el)=>{
        return arr.concat(el);
    },[]);
    console.log(transformedingredients);
    
    if (transformedingredients.length===0){
        transformedingredients = <p>Please add ingredients</p>|    }
    return (
    <div className= {classes.Burger}>
        <BurgerIngrediant type='bread-top'/>
         {transformedingredients}
        <BurgerIngrediant type ='bread-bottom'/>
    </div>
    );
};

export default Burger;