import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';


const controls =[
    {label :'Salad' , type : 'salad'},
    {label :'Bacon' , type : 'bacon'},
    {label :'Meat' , type : 'meat'},
    {label :'Cheese' , type : 'cheese'}
]

const BuildControls =(props) =>(
    <div className={classes.BuildControls}>
        <p> price : {props.price}</p>
        {controls.map(
            ctrl => (
                <BuildControl key = {ctrl.label} label={ctrl.label}
                added= {() => props.ingredientsadded(ctrl.type)} remove = {() => props.ingredientsremove(ctrl.type)}
                disable={props.disableInfo[ctrl.type]}/>
            ))}
        <button className= {classes.OrderButton} disabled ={!props.purchaseable} onClick={props.ordered}>
               ORDER NOW
        </button>    
    </div>
);


export default BuildControls;