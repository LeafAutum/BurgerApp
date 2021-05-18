import React from 'react';
import Classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawToggle from '../SideDrawer/DrawToggle/DrawToggle';

const Toolbar= (props) =>(
  <header className ={Classes.Toolbar}>
      <DrawToggle clicked={props.drawerToggleClicked}/>
      <div className= {Classes.Logo}>
           <Logo/>
      </div>
      <nav className={Classes.DesktopOnly}>
        <NavigationItems/>
      </nav>
      
  </header>
);


export default Toolbar;
