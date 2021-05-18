import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Classes from './SideDrawer.css';
import BackDrop from '../../../UI/Backdrop/Backdrop';
import Aux from '../../../../hoc/auxilary';


const SideDrawer = (props) => {
  let attachedClasses = [Classes.SideDrawer ,Classes.Close];
  if (props.open){
    attachedClasses = [Classes.SideDrawer ,Classes.open];
  }
  return(
  <Aux>
     <BackDrop show={props.open} clicked={props.closed}/>
     <div className={attachedClasses.join(' ')}>
         <div className= {Classes.Logo}>
           <Logo/>
         </div>
        
        <nav >
            <NavigationItems/>
        </nav>
     </div>
     
  </Aux>   
)};


export default SideDrawer;