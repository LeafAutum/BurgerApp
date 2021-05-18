import React from 'react';

import BurgerLogo from '../../../assets/Images/burger-logo.png';
import Burger from '../Burger';
import Classes from './Logo.css';

const Logo =()=> (
    <div className={Classes.Logo}>
        <img src= {BurgerLogo} alt='Burger'></img>
    </div>
);



export default Logo;