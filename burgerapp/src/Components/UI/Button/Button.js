import React from 'react';
import Classes from './Button.css';

const Button = (props)=>(
   <button className = {[Classes.Button , Classes[props.btnType]].join(" ")} disabled ={props.disabled} onClick ={props.clicked}>
       {props.children}
   </button>
);


export default Button;

