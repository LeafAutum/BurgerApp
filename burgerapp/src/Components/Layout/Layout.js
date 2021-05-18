import React, {Component} from 'react';
import Aux from '../../hoc/auxilary';
import Classes from '../Layout/Layout.css';
import Toolbar from '../Burger/Navigation/Toolbar/Toolbar';
import SideDrawer from '../Burger/Navigation/SideDrawer/SideDrawer';


class Layout  extends Component{
  state ={
     showSideDrawer :false
  }

  SideDrawerClosedHandler =() =>{
    this.setState({showSideDrawer : false})
  }
  sidedrawerToggleClicked = () =>{
    this.setState ((prevState) => {
      return {showSideDrawer : !prevState.showSideDrawer};
    });
  }

  render (){
    return (
      <Aux>
      <Toolbar drawerToggleClicked ={this.sidedrawerToggleClicked}/>
      <SideDrawer open={this.state.showSideDrawer} closed ={this.SideDrawerClosedHandler}/>
      <main className = {Classes.Content}> 
          {this.props.children}
      </main>

       </Aux>
       )}};


export default Layout;