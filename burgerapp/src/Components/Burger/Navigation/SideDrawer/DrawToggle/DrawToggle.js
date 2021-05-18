import React from 'react';
import Classes from './DrawToggle.css';

const DrawToggle = (props) =>(
  
    <div className={Classes.DrawerToggle} onClick = {props.clicked}>
        <div></div>
        <div></div>
        <div></div>
    </div>
    
);


export default DrawToggle;