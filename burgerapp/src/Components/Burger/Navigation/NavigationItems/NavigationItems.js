import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import Classes from './NavigationItems.css';

const NavigationItems = (props) => (
    <ul className={Classes.NavigationItems}>
        <NavigationItem link = '/' exact >BurgerBuilder</NavigationItem>
        <NavigationItem link = '/Checkout' >Checkout</NavigationItem>
    </ul>
);


export default NavigationItems;

